var request = require('request');
var config = require('../config');

// http://13.127.227.22/freeunlimited/v3/get/balance.php?apikey=p1
async function balanceCheckAPI() {
    return new Promise(function (resolve, reject) {
        url = config.joloSoftBaseURL + 'balance.php?apikey=' + config.joloSoftAPIKey;
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
async function bankAccountVerificationAPI(accountNo, ifscCode) {
    return new Promise(function (resolve, reject) {
        url = config.joloSoftBaseURL + 'account_check.php?apikey=' + config.joloSoftAPIKey +
            '&' + 'beneficiary_account_no=' + accountNo +
            '&' + 'beneficiary_ifsc=' + ifscCode +
            '&' + 'orderid=bava_' + Math.round((new Date()).getTime() / 1000);
        request(url, function (error, response, body) {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    })
}

//http://13.127.227.22/freeunlimited/v3/get/ transfer.php?apikey=p1&
// beneficiary_account_no=p2& beneficiary_ifsc=p3& amount=p4& orderid=p5&
// purpose=p6& mobileno=p7& remarks=p8
async function moneyTransferAPI(accountNo, ifscCode, amount, mobile) {
    return new Promise(function (resolve, reject) {
        url = config.joloSoftBaseURL + 'transfer.php?apikey=' + config.joloSoftAPIKey +
            '&' + 'beneficiary_account_no=' + accountNo +
            '&' + 'beneficiary_ifsc=' + ifscCode +
            '&' + 'amount=' + amount +
            '&' + 'orderid=mta_' + Math.round((new Date()).getTime() / 1000) +
            '&' + 'purpose=' + 'OTHERS' +
            '&' + 'mobileno=' + mobile +
            '&' + 'remarks=' + 'BrandName';
            console.log(url);
        request(url, function (error, response, body) {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}

module.exports.bankAccountVerificationAPI = bankAccountVerificationAPI;
module.exports.balanceCheckAPI = balanceCheckAPI;
module.exports.moneyTransferAPI = moneyTransferAPI;

