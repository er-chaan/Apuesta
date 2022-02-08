var request = require('request');
var config = require('../config');

// account_check.php ? apikey = p1 &
//     beneficiary_account_no=p2 & beneficiary_ifsc=p3 & orderid=p5

async function bankAccountVerificationAPI(accountNo, ifscCode) {
    return new Promise(function (resolve, reject) {
        url = config.joloSoftBaseURL + 'account_check.php?apikey=' + config.joloSoftAPIKey +
            '&' + 'beneficiary_account_no=' + accountNo +
            '&' + 'beneficiary_ifsc=' + ifscCode +
            '&' + 'orderid=bava_' + (Math.floor(Math.random() * 9999999) + 1000000).toString()
        request(url, function (error, response, body) {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    })
}

// http://13.127.227.22/freeunlimited/v3/get/demo/account_check.php?apikey=215675272528920&%20beneficiary_account_no=919004313006&%20beneficiary_ifsc=PYTM0123456&orderid=demo1

module.exports.bankAccountVerificationAPI = bankAccountVerificationAPI;
