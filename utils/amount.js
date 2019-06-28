const convert = require('convert-units');

function calculateTotalAmount(quantity, rate){
    return new Promise((resolve, reject) => {
        try{
            var newRate = convert(rate.value)
                          .from(''+rate.unit)
                          .to(''+quantity.unit);
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
