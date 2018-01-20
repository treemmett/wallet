const routes = require('express').Router();

const brackets = [
  {
    rate: 10,
    max: 9525
  },
  {
    rate: 12,
    max: 38700
  },
  {
    rate: 22,
    max: 82500
  },
  {
    rate: 24,
    max: 157500
  },
  {
    rate: 32,
    max: 200000
  },
  {
    rate: 35,
    max: 500000
  }
];

routes.get('/:income', (req, res,next) => {
  var tax = 0;

  for(let i = 0; i < brackets.length; i++){

		//Check if income has any default tax
    if(req.params.income > brackets[i].max){
  		var taxableAmount = brackets[i].max;

  		//Remove last bracket amount
  		if(i > 0){
  			taxableAmount -= brackets[i - 1].max;
      }

      //Determine tax amount for current bracket
      const currentTax = taxableAmount * (brackets[i].rate / 100);

      //Add currentTax to total tax amount
      tax += currentTax;
		}else{
      //Calculate tax for the highest bracket
      var taxableAmount = req.params.income;

      //Remove last bracket amount
      if(i > 0){
        taxableAmount -= brackets[i - 1].max;
      }

      //Determine tax
      const currentTax = taxableAmount * (brackets[i].rate / 100);

      //Add currentTax to total tax amount
      tax += currentTax;

      break;
    }
  }

  res.send(tax.toString());
});

module.exports = routes;
