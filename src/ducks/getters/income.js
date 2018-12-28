// import tax brackets
import fed from '../../../lib/taxModels/fed';
import ut from '../../../lib/taxModels/ut';

const taxBrackets = {ut, fed}

export default function income(state){
  const grossIncome =  state.income.reduce((acc, cur) => {
    let returnValue = 0;

    switch(cur.type){
      case 'salary': {
        returnValue = cur.rate;
        break;
      }

      case 'hourly': {
        const regHours = cur.hours > 40 ? 40 : cur.hours || 0;
        returnValue = regHours * cur.rate;

        if(cur.hours > 40){
          const otHours = cur.hours - 40;
          returnValue += otHours * cur.rate * 1.5;
        }

        returnValue *= 52;

        break;
      }
    }

    return acc + returnValue;
  }, 0);

  // calculate state and federal taxes
  const fedTax = calculateTax({ income: grossIncome, taxModel: taxBrackets.fed[state.tax.status] });
  const stateTax = calculateTax({ income: grossIncome, taxModel: taxBrackets[state.tax.state][state.tax.status] });

  return {
    tax: {
      federal: fedTax,
      state: stateTax
    },
    gross: grossIncome,
    net: grossIncome - (fedTax + stateTax)
  }
}

function calculateTax({ income, taxModel }){
  // calculate deductions
  const deductions = taxModel.deductions.reduce((acc, cur) => acc + cur.amount, 0);

  // skip if gross income is less than deductions
  if(income < deductions){
    return 0;
  }

  // remove deduductions from gross
  let taxableIncome = income - deductions;

  // sort brackets
  const brackets = taxModel.brackets.sort((a, b) => {
    if(a.bracket < b.bracket) return 1;
    if(a.bracket > b.bracket) return -1;
    return 0;
  });

  return brackets.reduce((acc, cur) => {
    // skip bracket if it's outside our income
    if(taxableIncome < cur.bracket) return acc;
    
    // calculate how much is taxed at this bracket
    const rangeToTax = taxableIncome - cur.bracket;

    // apply tax magic
    const tax = rangeToTax * (cur.rate / 100);

    // remove dollars that have already been taxed
    taxableIncome -= rangeToTax;

    return acc + tax;
  }, 0);
}