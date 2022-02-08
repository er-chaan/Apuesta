var express = require('express');
var router = express.Router();
var dbConn = require('../db');
var joloSoft = require('./joloSoft');
const { response } = require('express');

router.get('/logout', function (req, res) {
  dbConn.query("UPDATE users SET ?,? WHERE ?", [{ token: 'x' }, { isOnline: false }, { email: req.headers.email }], function (error, results, fields) {
    if (error) {
      return res.status(200).send({ status: false, error: error.sqlMessage });
    } else {
      return res.status(200).send({ status: true });
    }
  });
});

router.get('/:email', function (req, res) {
  dbConn.query("SELECT * FROM users WHERE ?", [{ email: req.params.email }], function (error, results) {
    if (error) {
      return res.status(200).send({ status: false, error: error.sqlMessage });
    } else {
      return res.status(200).send({ status: true, data: results[0] });
    }
  });
});

router.put('', function (req, res) {
  if (req.body.isVerified) {
    dbConn.query("UPDATE users SET ? WHERE email='" + req.headers.email + "' ", [
      req.body
    ], function (error, results, fields) {
      if (error) {
        return res.status(200).send({ status: false, error: error.sqlMessage });
      } else {
        return res.status(200).send({ status: true, data: req.body });
      }
    });
  } else {
    joloSoft.bankAccountVerificationAPI(req.body.accountNo, req.body.ifscCode).
      then((response) => {
        response = JSON.parse(response);
        if (response.status == "FAILED") {
          return res.status(200).send({ status: false, error: response.error });
        } else if (response.status == "SUCCESS") {
          req.body.isVerified = true;
          dbConn.query("UPDATE users SET ? WHERE email='" + req.headers.email + "' ", [
            req.body
          ], function (error, results, fields) {
            if (error) {
              return res.status(200).send({ status: false, error: error.sqlMessage });
            } else {
              return res.status(200).send({ status: true, data: req.body });
            }
          });
        } else {
          return res.status(200).send({ status: false, error: "Try Later" });
        }
      }).catch((error) => {
        return res.status(200).send({ status: false, error: error });
      });
  }
});

module.exports = router;
