const convert = require('convert-units');
 
function addQuantities(quantity1, quantity2){
    return new Promise((resolve, reject) => {
        try{
            var resultantQuantity = quantity1;
            if(quantity1.unit != quantity2.unit){
                quantity2.value = convert(quantity2.value)
                    .from(''+quantity2.unit)
                    .to(''+quantity1.unit);
            }
            resultantQuantity.value = quantity1.value + quantity2.value;
            resolve(resultantQuantity);
        }catch(err){
            reject({
                status: 400,
                response: "Unit type mismatch"
            });
        }
    });
}

module.exports = { addQuantities };
