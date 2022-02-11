var express = require('express');
var router = express.Router();
var dbConn = require('../db');
var joloSoft = require('./joloSoft');


router.post('/cashout', function (req, res) {
  // console.log(req.body.uid)
  // return res.status(200).send({ status: true });
  let userObj;
  dbConn.query("SELECT * FROM users WHERE ? AND ?", [{ email: req.headers.email }, { id: req.body.uid }], function (error, results) {
    if (error) {
      return res.status(200).send({ status: false, error: error.sqlMessage });
    } else {
      userObj = results[0];
      results = JSON.parse(JSON.stringify(results));
      if (results[0].wallet < req.body.amount) {
        return res.status(200).send({ status: false, error: "Insufficient API balance" });
      } else {
        joloSoft.moneyTransferAPI(userObj.accountNo, userObj.ifscCode, req.body.amount, userObj.mobile).
          then((response) => {
            response = JSON.parse(response);
            if (response.status == "FAILED") {
              description = "CashOUT - Transaction Failed : " + req.headers.email + " of " + req.body.amount + " but API Fund is " + response.balance + "";
              var sql = `INSERT INTO notifications (forAdmin, title, description) 
                      VALUES (true, 'Insufficient API balance','` + description + `'  )`;
              dbConn.query(sql, function (error) {
                if (error) {
                  return res.status(200).send({ status: false, error: "Insufficient API balance AND Admin Notifications Failed." });
                } else {
                  return res.status(200).send({ status: false, error: response.error });
                }
              });
            } else if (response.status == "ACCEPTED") {

              // transfer
              // return res.status(200).send({ status: true, data: response })
              sql = "UPDATE users SET wallet=wallet-" + req.body.amount + " WHERE id=" + req.body.uid + "";
              dbConn.query(sql, null, function (error, results, fields) {
                if (error) {
                  return res.status(200).send({ status: false, error: error.sqlMessage });
                } else {
                  // return res.status(200).send({ status: true });
                  scripts = `INSERT INTO transactions_users(uid, mode, amount, description) VALUES(${req.body.uid},'debit', ${-req.body.amount}, 'Withdraw');`;
                  dbConn.query(scripts, null, function (error) {
                    if (error) {
                      return res.status(200).send({ status: false, error: "Transfer Successfull Only Insert Failed : " + error.sqlMessage });
                    } else {
                      return res.status(200).send({ status: true, data: response })
                    }
                  });
                }
              });

              // var sql = ``;
              // dbConn.query(sql, function (error) {
              //   if (error) {
              //     return res.status(200).send({ status: false, error: "Insufficient API balance AND Admin Notifications Failed." });
              //   } else {
              //     return res.status(200).send({ status: false, error: response.error });
              //   }
              // });


            } else {
              return res.status(200).send({ status: false, error: "Try Later" });
            }
          }).catch((error) => {
            return res.status(200).send({ status: false, error: error });
          });

        // joloSoft.balanceCheckAPI().
        //   then((response) => {
        //     response = JSON.parse(response);
        //     if (response.status == "FAILED") {
        //       return res.status(200).send({ status: false, error: response.error });
        //     } else if (response.status == "SUCCESS") {
        //       if (parseFloat((req.body.amount + 50)) < response.balance) {
        //         // notify admin
        //         description = "CashOUT - Transaction Failed : " + req.headers.email + " of " + req.body.amount + " but API Fund is " + response.balance + "";
        //         var sql = `
        //         INSERT INTO notifications (forAdmin, title, description) 
        //         VALUES (true, 'Insufficient API balance','` + description + `'  )`;
        //         dbConn.query(sql, function (error, results, fields) {
        //           if (error) {
        //             return res.status(200).send({ status: false, error: error.sqlMessage });
        //           } else {
        //             if (results.insertId) {
        //               // return res.status(200).send({ status: true, data: results.insertId });
        //               return res.status(200).send({ status: false, error: "Insufficient API balance, Try Later" });
        //             } else {
        //               return res.status(200).send({ status: false, error: "Failed" });
        //             }
        //           }
        //         });
        //       } else {
        //         // transfer
        //         // return res.status(200).send({ status: true, data: response });
        //       }
        //     } else {
        //       return res.status(200).send({ status: false, error: "Try Later" });
        //     }
        //   }).catch((error) => {
        //     return res.status(200).send({ status: false, error: error });
        //   });

      }
    }
  });
});


router.post('/cashin', function (req, res) {
  // console.log(req.body);
  return res.status(200).send({ status: false, error: "Under development" });
});

module.exports = router;
