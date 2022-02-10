var express = require('express');
var router = express.Router();
var dbConn = require('../db');
var config = require('../config');
var mail = require('../mail');


router.post('/', function (req, res) {
  req.body.response = "NULL"; 
  // check active start
  dbConn.query("SELECT * FROM users WHERE email=? AND status='inactive'", req.body.email, function (error, results) {
    if (error) {
      return res.status(200).send({ status: false, error: error.sqlMessage });
    } else {
      if (results.length) {
        return res.status(200).send({ status: false, error: "Account Inactive" });
      } else {
        dbConn.query("SELECT * FROM users WHERE email=?", req.body.email, function (error, resultsX) {
          if (error) {
            return res.status(200).send({ status: false, error: error.sqlMessage });
          } else {
            if (resultsX.length) {
              dbConn.query("UPDATE users SET visits=visits+1,?,? WHERE ? ", [{ isOnline: true }, { token: req.body.authToken }, { email: req.body.email }], function (error, results, fields) {
                if (error) {
                  return res.status(200).send({ status: false, error: error.sqlMessage });
                } else {
                  data = JSON.parse(JSON.stringify(resultsX));
                  req.body.uid = data[0].id;
                  return res.status(200).send({ status: true, data: req.body });
                }
              });
            } else {
              dbConn.query("INSERT INTO users SET ? ", { wallet: 50, name: req.body.name, email: req.body.email, token: req.body.authToken }, function (error, results, fields) {
                if (error) {
                  return res.status(200).send({ status: false, error: error.sqlMessage });
                } else {
                  // mail();
                  generateTransaction(req.body, results.insertId, res);
                }
              });
            }
          }
        });
      }
    }
  });
  // check active ends
});

function generateTransaction(data, id, res) {
  scripts = `INSERT INTO transactions(uid, mode, amount, description) VALUES(${id},'debit', -50, 'Welcome Bonus To : ${data.email}');`;
  dbConn.query(scripts, null, function (error, results, fields) {
    if (error) {
      console.log(error.sqlMessage);
      dbConn.query("DELETE FROM users WHERE id=" + id + "");
      return res.status(200).send({ status: false, error: error.sqlMessage });
    } else {
      scripts = `INSERT INTO transactions_users(uid, mode, amount, description) VALUES(${id},'credit', +50, 'Welcome Bonus');`;
      dbConn.query(scripts, null, function (error) {
        if (error) {
          console.log(error.sqlMessage);
          dbConn.query("DELETE FROM users WHERE id=" + id + "");
          dbConn.query("DELETE FROM transactions WHERE id=" + results.insertId + "");
          return res.status(200).send({ status: false, error: error.sqlMessage });
        } else {
          data.uid = id;
          return res.status(200).send({ status: true, data: data });
        }
      });
    }
  });
}

function mail() {
  // var mailOptions = {
  //   from: config.email,
  //   to: data.email,
  //   subject: 'el-Apuesta | Welcome',
  //   text: 'enjoy hassle free betting'
  // };      
  // mail.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log(info);
  //   }
  // });
}
module.exports = router;
