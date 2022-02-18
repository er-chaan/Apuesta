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
    order = "ASC";
    if(req.params.status == "completed"){
        order = "DESC";
    }
    dbConn.query("SELECT * FROM board WHERE ? ORDER BY startsAt "+order+" Limit 5", [{ status: req.params.status }], function (error, results) {
        if (error) {
            return res.status(200).send({ status: false, error: error.sqlMessage });
        } else {
            return res.status(200).send({ status: true, data: results });
        }
    });
});


module.exports = router;