var express = require('express');
var router = express.Router();
var dbConn = require('../db');
var joloSoft = require('./joloSoft');

router.get('/users/total', function (req, res) {
    dbConn.query("SELECT count(*) as res FROM users", null, function (error, results) {
        if (error) {
            return res.status(200).send({ status: false, error: error.sqlMessage });
        } else {
            return res.status(200).send({ status: true, data: results[0] });
        }
    });
});
router.get('/users/online', function (req, res) {
    dbConn.query("SELECT count(*) as res FROM users WHERE isOnline=true", null, function (error, results) {
        if (error) {
            return res.status(200).send({ status: false, error: error.sqlMessage });
        } else {
            return res.status(200).send({ status: true, data: results[0] });
        }
    });
});
router.get('/users/balance', function (req, res) {
    dbConn.query("SELECT sum(wallet) as res FROM users", null, function (error, results) {
        if (error) {
            return res.status(200).send({ status: false, error: error.sqlMessage });
        } else {
            return res.status(200).send({ status: true, data: results[0] });
        }
    });
});
router.get('/users/balance', function (req, res) {
    dbConn.query("SELECT sum(wallet) as res FROM users", null, function (error, results) {
        if (error) {
            return res.status(200).send({ status: false, error: error.sqlMessage });
        } else {
            return res.status(200).send({ status: true, data: results[0] });
        }
    });
});
router.get('/bookie/balance', function (req, res) {
    dbConn.query("SELECT sum(amount) as res FROM transactions", null, function (error, results) {
        if (error) {
            return res.status(200).send({ status: false, error: error.sqlMessage });
        } else {
            return res.status(200).send({ status: true, data: results[0] });
        }
    });
});
router.get('/jolo/balance', function (req, res) {
    joloSoft.balanceCheckAPI().
        then((response) => {
            response = JSON.parse(response);
            if (response.status == "FAILED") {
                return res.status(200).send({ status: false, error: response.error });
            } else if (response.status == "SUCCESS") {
                response.res = response.balance;
                return res.status(200).send({ status: true, data: response });
            } else {
                return res.status(200).send({ status: false, error: "Try Later" });
            }
        }).catch((error) => {
            return res.status(200).send({ status: false, error: error });
        });
});






module.exports = router;