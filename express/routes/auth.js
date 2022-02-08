var express = require('express');
var router = express.Router();
var dbConn = require('../db');
var config = require('../config');
var mail = require('../mail');


router.post('/', function (req, res) {
  // check active start
  dbConn.query("SELECT * FROM users WHERE email=? AND status='inactive'", req.body.email, function (error, results) {
    if (error) {
      return res.status(200).send({ status: false, error: error.sqlMessage });
    } else {
      if (results.length) {
        return res.status(200).send({ status: false, error: "Account Inactive" });
      } else {
        dbConn.query("SELECT * FROM users WHERE email=?", req.body.email, function (error, results) {
          if (error) {
            return res.status(200).send({ status: false, error: error.sqlMessage });
          } else {
            if (results.length) {
              dbConn.query("UPDATE users SET ?,? WHERE ? ", [{ isOnline: true }, { token: req.body.authToken }, { email: req.body.email }], function (error, results, fields) {
                if (error) {
                  return res.status(200).send({ status: false, error: error.sqlMessage });
                } else {
                  return res.status(200).send({ status: true, data: req.body });
                }
              });
            } else {
              dbConn.query("INSERT INTO users SET ? ", { name: req.body.name, email: req.body.email, token: req.body.authToken }, function (error, results, fields) {
                if (error) {
                  return res.status(200).send({ status: false, error: error.sqlMessage });
                } else {
                  // mail();
                  createTransationTable(req.body, results.insertId, res);
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

function createTransationTable(data, id, res) {
  scripts = `
  CREATE TABLE transactions_${id} (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    mode enum('credit','debit') DEFAULT NULL,
    amount float NOT NULL DEFAULT '0',
    description text NOT NULL,
    updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status enum('success','failed') NOT NULL DEFAULT 'success'
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `;
  // console.log("INSERT INTO transactions(mode, amount, description, status) VALUES('credit', -50, 'Welcome Bonus Uid : ', 'success');")
  scripts += `INSERT INTO Apuesta.transactions(mode, amount, description) VALUES('credit', -50, 'Welcome Bonus Uid : ');`;
  dbConn.query(scripts, null, function (error, results, fields) {
    if (error) {
      console.log(error.sqlMessage);
      dbConn.query("DELETE FROM users WHERE id=" + id + "");
      return res.status(200).send({ status: false, error: error.sqlMessage });
    } else {
      return res.status(200).send({ status: true, data: data });
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
