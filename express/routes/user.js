var express = require('express');
var router = express.Router();
var dbConn = require('../db');

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
  if(req.body.accountNo || req.body.ifscCode){
    
  }
  dbConn.query("UPDATE users SET ? WHERE email='"+req.headers.email+"' ", [
    req.body
  ], function (error, results, fields) {
    if (error) {
      return res.status(200).send({ status: false, error: error.sqlMessage });
    } else {
      return res.status(200).send({ status: true, data: req.body });
    }
  });
});

module.exports = router;
