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

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
