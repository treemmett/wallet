const formatCurrency = e => {
  let input = '',
      eIsDOM = false;

  if(typeof e === 'object'){
    input = e.target.value;
    eIsDOM = true;
  }else if(typeof e === 'string'){
    input = e;
    eIsDOM = false;
  }

  //Remove all non currency characters from value
  const clean = input.replace(/[^\d.{1}]/g, '');

  //Remove all periods after the first
  const split = clean.split('.');

  //Seperate dollars and cents
  const dollars = split.shift();
  let cents = split.join('').substring(0,2);

  //Add decimal if needed
  if(split.length || e.type === 'blur' || !eIsDOM){
    cents = '.' + cents;
  }

  //Add padding to cents
  if(e.type === 'blur' || !eIsDOM){
    cents += '0'.repeat(3 - cents.length);
  }

  //Store numeric value
  const value = Number(dollars + cents);

  //Return nothing if value is null
  if(value === 0){
    if(eIsDOM && e.type === 'blur'){
      e.target.value = null;
    }

    return;
  }

  //Pretify value
  const valueToPush = '$' + dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + cents;

  if(eIsDOM){
    e.target.value = valueToPush;
  }

  return valueToPush;
}
export default formatCurrency;
