var express = require('express');
var router = express.Router();
var dbConn = require('../db');

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
                  return res.status(200).send({ status: true, data: req.body });
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

module.exports = router;
