var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dbConn = require('./db');



// starts
var openMiddleware = function (req, res, next) {
    token = req.headers.token;
    mobile = req.headers.mobile;
    if (token == 'x' && mobile == 'x') {
        next();
    } else {
        res.status(400).send("unauthorized");
    }
}

var closedMiddleware = function (req, res, next) {
    token = req.headers.token;
    mobile = req.headers.mobile;
    if (token) {
        if (token != 'x') {
            dbConn.query('SELECT id FROM users where ? AND ?', [{ mobile: mobile }, { token: token }], function (error, results, fields) {
                if (error) {
                    return res.status(400).send({ error: true, message: error.message });
                }
                if (!results[0]) {
                    return res.status(400).send({ error: true, message: "unauthorized" });
                }
                next();
            });
        } else {
            res.status(400).send("unauthorized");
        }
    } else {
        res.status(400).send("unauthorized");
    }
}

var adminMiddleware = function (req, res, next) {
    token = req.headers.token;
    mobile = req.headers.mobile;
    if (token) {
        if (token != 'x') {
            if (mobile != '9004313006') {
                return res.status(400).send({ error: true, message: "unauthorized" });
            }
            dbConn.query('SELECT id FROM users where ? AND ?', [{ mobile: mobile }, { token: token }], function (error, results, fields) {
                if (error) {
                    return res.status(400).send({ error: true, message: error.message });
                }
                if (!results[0]) {
                    return res.status(400).send({ error: true, message: "unauthorized" });
                }
                next();
            });
        } else {
            res.status(400).send("unauthorized");
        }
    } else {
        res.status(400).send("unauthorized");
    }
}
// ends


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', openMiddleware, indexRouter);
app.use('/users', openMiddleware, usersRouter);






module.exports = app;
