var express = require('express');
var router = express.Router();
var config = require('../config');
var dbConn = require('../db');

router.post('/', function (req, res, next) {
    if (req.body.STATUS && req.body.RESPMSG) {

        if (req.body.STATUS == "TXN_SUCCESS") {
            uid = req.body.ORDERID.split("_")[0];
            dbConn.query(`INSERT INTO transactions_users(uid,oid,mode,amount,description) 
                        VALUES(${uid},'${req.body.ORDERID}','credit', ${req.body.TXNAMOUNT}, 'Deposit')`);
            dbConn.query(`UPDATE users SET wallet=wallet+${req.body.TXNAMOUNT} WHERE id=${uid} `);
        }

        res.redirect(config.paytmCallbackFrontend + "/" + req.body.STATUS + '/' + req.body.RESPMSG);
    } else {
        res.redirect(config.paytmCallbackFrontend + "/TXN_FAILURE/UNKNOWN");
    }
});


module.exports = router;




// failed
// {
//   BANKNAME: 'Kotak Bank',
//   BANKTXNID: '15028607812',
//   CHECKSUMHASH: 'DQIHFQsfKEvZZxMtU2LUQU7Av8RLGYmIMPG//2iuYmmqpeGHaA1Advu2j57BysUdEpxDfSmXG8UB+xxXZpyGr1yPR6m9jrJCAYMnuKPnx6U=',
//   CURRENCY: 'INR',
//   GATEWAYNAME: 'NKMB',
//   MID: 'lysWwv61149251509055',
//   ORDERID: 'txn_1644661308',
//   PAYMENTMODE: 'NB',
//   RESPCODE: '227',
//   RESPMSG: 'Your payment has been declined by your bank. Please try again or use a different method to complete the payment.',
//   STATUS: 'TXN_FAILURE',
//   TXNAMOUNT: '100.00',
//   TXNDATE: '2022-02-12 15:51:48.0',
//   TXNID: '20220212111212800110168769303437866'
// }
// success
// {
//   BANKNAME: 'Andhra Bank',
//   BANKTXNID: '13238578806',
//   CHECKSUMHASH: 'I81UFvkcg/KEQy+s8eCy5LzsztdM/8NVvfddvrQKSnf1StzzDg6IqQpDbHGggetL2mfWkwqbgmO9wbj7K6K7LINCxKzqd6ZEsQxQxPeJk6g=',
//   CURRENCY: 'INR',
//   GATEWAYNAME: 'ANDB',
//   MID: 'lysWwv61149251509055',
//   ORDERID: 'txn_1644661136',
//   PAYMENTMODE: 'NB',
//   RESPCODE: '01',
//   RESPMSG: 'Txn Success',
//   STATUS: 'TXN_SUCCESS',
//   TXNAMOUNT: '100.00',
//   TXNDATE: '2022-02-12 15:48:56.0',
//   TXNID: '20220212111212800110168459403462995'
// }