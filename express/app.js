var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dbConn = require('./db');
var cors = require('cors');



// starts
var openMiddleware = function (req, res, next) {
    token = req.headers.token;
    email = req.headers.email;
    if (token == 'x' && email == 'x') {
        next();
    } else {
        res.status(401).send("unauthorized");
    }
}

var closedMiddleware = function (req, res, next) {
    token = req.headers.token;
    email = req.headers.email;
    if (token) {
        if (token != 'x') {
            dbConn.query('SELECT id FROM users WHERE ? AND ?', [{ email: email }, { token: token }], function (error, results, fields) {
                if (error) {
                    return res.status(200).send({ status: false, error: error.sqlMessage });
                } else {
                    if (results.length) {
                        next();
                    } else {
                        res.status(401).send("unauthorized");
                    }
                }
            });
        } else {
            res.status(401).send("unauthorized");
        }
    } else {
        res.status(401).send("unauthorized");
    }
}

var adminMiddleware = function (req, res, next) {
    token = req.headers.token;
    email = req.headers.email;
    if (token) {
        if (token != 'x') {
            if (email != 'er.chandreshbhai@gmail.com') {
                res.status(401).send("unauthorized");
            } else {
                dbConn.query('SELECT id FROM users where ? AND ?', [{ email: email }, { token: token }], function (error, results, fields) {
                    if (error) {
                        return res.status(200).send({ status: false, error: error.sqlMessage });
                    }else{
                        if (results.length) {
                            next();
                        } else {
                            res.status(401).send("unauthorized");
                        }
                    }
                });
            }
        } else {
            res.status(401).send("unauthorized");
        }
    } else {
        res.status(401).send("unauthorized");
    }
}
// ends



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var supportRouter = require('./routes/support');

app.use('/', indexRouter);
app.use('/auth', openMiddleware, authRouter);
app.use('/user', closedMiddleware, userRouter);
app.use('/support', closedMiddleware, supportRouter);






module.exports = app;
