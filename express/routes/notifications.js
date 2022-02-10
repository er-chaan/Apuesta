var express = require('express');
var router = express.Router();
var dbConn = require('../db');

router.get('/', function (req, res) {
    dbConn.query("SELECT * FROM notifications WHERE status='active' ORDER BY id DESC LIMIT 3", null, function (error, results) {
        if (error) {
            return res.status(200).send({ status: false, error: error.sqlMessage });
        } else {
            return res.status(200).send({ status: true, data: results });
        }
    });
});



module.exports = router;