const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const db = require('./db');
const axios = require('axios')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const portfolioRouter = require("./routes/portfolio");
const trendsRouter = require("./routes/trends");
const transactionsRouter = require("./routes/transactions")

const app = express();

app.use(logger('dev'));
app.use(cors({ credentials: true, origin: "http://localhost:3000"}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/', indexRouter);
app.use('/api/users', usersRouter(db));
app.use('/api/portfolio', portfolioRouter(db));
app.use('/api/trends', trendsRouter(db));
app.use('/api/transactions', transactionsRouter(db));


module.exports = app;
