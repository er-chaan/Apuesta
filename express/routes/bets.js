var express = require('express');
var router = express.Router();
var dbConn = require('../db');

router.get('/:uid', function (req, res) {
    dbConn.query("SELECT * FROM bets WHERE ? ORDER BY id DESC", [{ uid: req.params.uid }], function (error, results) {
        if (error) {
            return res.status(200).send({ status: false, error: error.sqlMessage });
        } else {
            return res.status(200).send({ status: true, data: results });
        }
    });
});

router.post('/', function (req, res) {

    dbConn.query("SELECT * FROM users WHERE ?", [{ email: req.headers.email }], function (error, results) {
        if (error) {
            return res.status(200).send({ status: false, error: error.sqlMessage });
        } else {
            if (results[0].wallet < req.body.amount) {
                return res.status(200).send({ status: false, error: "Insufficiant balance in wallet." });
            } else {

                dbConn.query("SELECT * FROM board WHERE ?", [{ id: req.body.bid }], function (error, resultsX) {
                    if (error) {
                        return res.status(200).send({ status: false, error: error.sqlMessage });
                    } else {
                        var diff = Math.round((new Date(resultsX[0].startsAt) - new Date()) / 60000);
                        if (diff > 30) {
                            if (resultsX[0].teamA == req.body.team && req.body.type == "toss") {
                                rate = resultsX[0].rateTossTeamA;
                            }
                            if (resultsX[0].teamA == req.body.team && req.body.type == "result") {
                                rate = resultsX[0].rateWinnerTeamA;
                            }
                            if (resultsX[0].teamB == req.body.team && req.body.type == "toss") {
                                rate = resultsX[0].rateTossTeamB;
                            }
                            if (resultsX[0].teamB == req.body.team && req.body.type == "result") {
                                rate = resultsX[0].rateWinnerTeamB;
                            }
                            if (rate == 0) {
                                return res.status(200).send({ status: false, error: "Rate not freezed yet. try later." });
                            }
                            // -----------------------------
                            sql = "UPDATE users SET wallet=wallet-" + req.body.amount + " WHERE id=" + req.body.uid + "";
                            dbConn.query(sql, null, function (error, results, fields) {
                                if (error) {
                                    return res.status(200).send({ status: false, error: error.sqlMessage });
                                } else {
                                    description = "booked bet on #[" + req.body.bid + "] " + req.body.team + "-" + req.body.type;
                                    scripts = `INSERT INTO transactions_users(uid, mode, amount, description) 
                                                    VALUES(${req.body.uid},'debit', ${-req.body.amount}, '${description}');`;
                                    dbConn.query(scripts);
                                    scripts = `INSERT INTO transactions(uid, mode, amount, description) 
                                                    VALUES(${req.body.uid},'credit', ${req.body.amount}, '${description}');`;
                                    dbConn.query(scripts);
                                    var sql = `INSERT INTO bets (rate, team, type, uid, bid, amount) 
                                                    VALUES (`+ rate + `,'` + req.body.team.trim() + `','` + req.body.type.trim() + `',` + req.body.uid + `,` + req.body.bid + `,` + req.body.amount + `  )`;
                                    dbConn.query(sql, function (error, results, fields) {
                                        if (error) {
                                            return res.status(200).send({ status: false, error: error.sqlMessage });
                                        } else {
                                            if (results.insertId) {
                                                return res.status(200).send({ status: true, data: results.insertId });
                                            } else {
                                                return res.status(200).send({ status: false, error: "Failed" });
                                            }
                                        }
                                    });
                                }
                            });
                            // ---------------------------------

                        } else {
                            return res.status(200).send({ status: false, error: "Bet time closed." });
                        }
                    }
                });


            }
        }
    });

});


module.exports = router;