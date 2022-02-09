var express = require('express');
var router = express.Router();
var dbConn = require('../db');

router.get('/:uid', function (req, res) {
    console.log(req.params.uid)
    dbConn.query("SELECT * FROM transactions_users WHERE ? ORDER BY id DESC", [{ uid: req.params.uid }], function (error, results) {
        if (error) {
            return res.status(200).send({ status: false, error: error.sqlMessage });
        } else {
            return res.status(200).send({ status: true, data: results });
        }
    });
});



module.exports = router;