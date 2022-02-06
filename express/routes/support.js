var express = require('express');
var router = express.Router();
var dbConn = require('../db');

router.get('/:email', function (req, res) {
    dbConn.query("SELECT * FROM support WHERE ? AND status='active' ORDER BY id DESC", [{ email: req.params.email }], function (error, results) {
        if (error) {
            return res.status(200).send({ status: false, error: error.sqlMessage });
        } else {
            return res.status(200).send({ status: true, data: results });
        }
    });
});

router.post('/', function (req, res) {

    dbConn.query("SELECT * FROM support WHERE ? AND ? AND status='active' ORDER BY id DESC", [{ email: req.body.email }, { issue: req.body.issue }], function (error, results) {
        if (error) {
            return res.status(200).send({ status: false, error: error.sqlMessage });
        } else {
            if (results.length) {
                return res.status(200).send({ status: false, error: "Issue already active" });
            } else {
                var sql = `
                INSERT INTO support (email, issue, description) 
                VALUES ('`+ req.body.email.trim() + `', '` + req.body.issue.trim() + `','` + req.body.description.trim() + `'  )`;
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
        }
    });

});

// router.put('/:id', function (req, res) {
//     if (!req.params.id) {
//         return res.status(400).send({ status: false, message: 'Invalid Operation' });
//     }
//     dbConn.query("UPDATE 1_instruments SET ? WHERE ?",
//         [{ symbol: req.body.symbol.trim(), instrumentCode: req.body.instrumentCode.trim(), feedCode: req.body.feedCode.trim() }, { id: req.params.id }], function (error, results, fields) {
//             if (error) {
//                 return res.status(400).send({ status: "fail", message: error.message });
//             }
//             if (results.affectedRows) {
//                 return res.status(200).send({ status: "success", message: "Update Success !" });
//             }
//             if (!results.affectedRows) {
//                 return res.status(400).send({ status: "fail", message: "Update Failed !" });
//             }
//         });
// });



module.exports = router;