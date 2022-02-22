const https = require('https');
var config = require('../config');
/*
* import checksum generation utility
* You can get this utility from https://developer.paytm.com/docs/checksum/
* https://business.paytm.com/docs/api/initiate-transaction-api/
* https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid={mid}&orderId={order-id}
*/
const PaytmChecksum = require('./paytmChecksum');

async function InitiateTransactionAPI(amount, uid) {
    return new Promise(
        function (resolve, reject) {
            // --------------------------------------------
            var paytmParams = {};
            orderId = uid + '_' + Math.round((new Date()).getTime() / 1000);
            paytmParams.body = {
                "requestType": "Payment",
                "mid": config.paytmMid,
                "websiteName": config.paytmWebsite,
                "orderId": orderId,
                "callbackUrl": config.paytmCallback,
                "txnAmount": {
                    "value": amount,
                    "currency": "INR",
                },
                "userInfo": {
                    "custId": "CUST_" + uid,
                },
            };
            /*
               * Generate checksum by parameters we have in body
               * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
               */
            PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), config.paytmKey).then(function (checksum) {

                paytmParams.head = {
                    "signature": checksum
                };

                var post_data = JSON.stringify(paytmParams);

                var options = {

                    /* for Staging */
                    hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    // hostname: 'securegw.paytm.in',

                    port: 443,
                    path: '/theia/api/v1/initiateTransaction?mid=' + config.paytmMid + '&orderId=' + orderId,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        // console.log('Response: ', response);
                        // resolve(response);
                        response = JSON.parse(response);
                        res = {
                            orderId: orderId,
                            txnToken: response.body.txnToken
                        }
                        resolve(res);
                    });
                });

                post_req.write(post_data);
                post_req.end();
            });
            // -------------------------------------------------
        }
    );
}


// curl -X POST 'https://staging-dashboard.paytm.com/bpay/api/v1/disburse/order/bank' \
// --header 'Content-Type: application/json' \
// --header 'x-mid: {mid}' \
// --header 'x-checksum: {checksum}' \
// --data '{"subwalletGuid":"28054249-XXXX-XXXX-af8f-fa163e429e83","orderId":"ORDERID_98765","beneficiaryAccount":"918008484891","beneficiaryIFSC":"PYTM0123456","purpose":"SALARY_DISBURSEMENT","date":"2020-06-01","amount":"1.00"}'

// https://business.paytm.com/docs/api/bank-transfer-api/
// async function BankTransferAPI(amount, uid) {
//     return new Promise(

//     );
// }


module.exports.InitiateTransactionAPI = InitiateTransactionAPI;
// module.exports.BankTransferAPI = BankTransferAPI;
