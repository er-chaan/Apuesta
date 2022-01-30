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
            dbConn.query('SELECT id FROM users where ? AND ?', [{ email: email }, { token: token }], function (error, results, fields) {
                if (error) {
                    return res.status(401).send({ error: true, message: error.message });
                }
                if (!results[0]) {
                    return res.status(401).send({ error: true, message: "unauthorized" });
                }
                next();
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
            if (email != '9004313006') {
                return res.status(401).send({ error: true, message: "unauthorized" });
            }
            dbConn.query('SELECT id FROM users where ? AND ?', [{ email: email }, { token: token }], function (error, results, fields) {
                if (error) {
                    return res.status(401).send({ error: true, message: error.message });
                }
                if (!results[0]) {
                    return res.status(401).send({ error: true, message: "unauthorized" });
                }
                next();
            });
        } else {
            res.status(401).send("unauthorized");
        }
    } else {
        res.status(401).send("unauthorized");
    }
}
// ends


var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', openMiddleware, indexRouter);
app.use('/auth', openMiddleware, authRouter);
app.use('/users', openMiddleware, usersRouter);






module.exports = app;
