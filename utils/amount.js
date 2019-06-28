const convert = require('convert-units');

function calculateTotalAmount(quantity, rate){
    return new Promise((resolve, reject) => {
        try{
            var newRate = rate.value; 
            if(rate.unit != quantity.unit){
                newRate = convert(rate.value)
                          .from(''+quantity.unit)
                          .to(''+rate.unit);
            }
            var totalCost = quantity.value * newRate;
            resolve(totalCost);
        }catch(err){
            reject({
                status: 400,
                response: "Unit type mismatch"
            });
        }
    });
}

module.exports = { calculateTotalAmount };
