var express = require('express');
var router = express.Router();
var dbConn = require('../db');

router.get('/', function (req, res) {
    dbConn.query("SELECT * FROM board ORDER BY id DESC", null, function (error, results) {
        if (error) {
            return res.status(200).send({ status: false, error: error.sqlMessage });
        } else {
            return res.status(200).send({ status: true, data: results });
        }
    });
});
router.get('/status/:status', function (req, res) {
    dbConn.query("SELECT * FROM board WHERE ? ORDER BY id DESC", [{ status: req.params.status }], function (error, results) {
        if (error) {
            return res.status(200).send({ status: false, error: error.sqlMessage });
        } else {
            return res.status(200).send({ status: true, data: results[0] });
        }
    });
});


module.exports = router;