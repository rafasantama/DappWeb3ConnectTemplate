module.exports = (function(){
    const crypto = require("crypto");
    var getRamdonName = function () {
        return new Promise(async (resolve, reject) =>{
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString("hex");
                resolve(filename);
            });
        });
    }

    return {
        getRamdonName: getRamdonName
    }

})();