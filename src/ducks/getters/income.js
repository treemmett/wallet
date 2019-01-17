// import tax brackets
import fed from '../../../lib/taxModels/fed';
import al from '../../../lib/taxModels/al';
import ak from '../../../lib/taxModels/ak';
import az from '../../../lib/taxModels/az';
import ar from '../../../lib/taxModels/ar';
import ca from '../../../lib/taxModels/ca';
import co from '../../../lib/taxModels/co';
import ct from '../../../lib/taxModels/ct';
import de from '../../../lib/taxModels/de';
import fl from '../../../lib/taxModels/fl';
import ga from '../../../lib/taxModels/ga';
import hi from '../../../lib/taxModels/hi';
import id from '../../../lib/taxModels/id';
import ut from '../../../lib/taxModels/ut';

const taxBrackets = {
  fed,
  al,
  ak,
  az,
  ar,
  ca,
  co,
  ct,
  de,
  fl,
  ga,
  hi,
  id,
  ut
};

function calculateTax({ grossIncome, taxModel }) {
  const breakdown = taxModel.reduce((calculatedTax, model) => {
    // calculate deductions
    const deductions = model.deductions.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );

    // skip if gross income is less than deductions
    if (grossIncome < deductions) {
      return calculatedTax.concat([
        { name: model.name, deductions, adjustedGross: 0, tax: 0 }
      ]);
    }

    // calculate adjusted gross income
    let agi = grossIncome - deductions;

    // sort brackets
    const brackets = model.brackets.sort((a, b) => {
      if (a.bracket < b.bracket) return 1;
      if (a.bracket > b.bracket) return -1;
      return 0;
    });

    const tax = brackets.reduce((acc, cur) => {
      // skip bracket if it's outside our income
      if (agi < cur.bracket) return acc;

      // calculate how much is taxed at this bracket
      const rangeToTax = agi - cur.bracket;

      // apply tax magic
      const taxAmount = parseFloat((rangeToTax * (cur.rate / 100)).toFixed(2));

      // remove dollars that have already been taxed
      agi -= rangeToTax;

      return acc + taxAmount;
    }, 0);

    return calculatedTax.concat([{ name: model.name, deductions, tax }]);
  }, []);

  return breakdown;
}

export default function income(state) {
  const grossIncome = state.income.reduce((acc, cur) => {
    let returnValue = 0;

    switch (cur.type) {
      case 'salary': {
        returnValue = cur.rate;
        break;
      }

      case 'hourly': {
        const regHours = cur.hours > 40 ? 40 : cur.hours || 0;
        returnValue = regHours * cur.rate;

        if (cur.hours > 40) {
          const otHours = cur.hours - 40;
          returnValue += otHours * cur.rate * 1.5;
        }

        returnValue *= 52;

        break;
      }

      default:
        break;
    }

    return acc + returnValue;
  }, 0);

  // calculate fed and state taxes
  const fedTax = calculateTax({
    grossIncome,
    taxModel: taxBrackets.fed[state.tax.status].taxes
  });
  const stateTax = calculateTax({
    grossIncome,
    taxModel: taxBrackets[state.tax.state][state.tax.status].taxes
  });

  const tax = {
    federal: fedTax.reduce((acc, cur) => acc + cur.tax, 0),
    state: stateTax.reduce((acc, cur) => acc + cur.tax, 0)
  };

  return {
    tax,
    gross: grossIncome,
    net: grossIncome - (tax.federal + tax.state)
  };
}
