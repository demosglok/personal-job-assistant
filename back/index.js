require('dotenv').config();
const dbConfig = require('./app/config/database')
const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const createError = require('http-errors');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const passportInit = require('./app/utils/passportInit');
const routes = require('./app/routes');
const authenticatedUserExpansionMiddleware = require('./app/middleware/authenticatedUserExpansion');

// database part
mongoose.connect(dbConfig.mongoUrl, dbConfig.mongoOptions);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', (err) => console.error('MongoDB connection error:', err));

// passport
passportInit();

// webserver part
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET || 'some strange and long string to be served as secret',
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
}));
app.use(cors({ credentials: true, origin: true }));

app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(authenticatedUserExpansionMiddleware);

app.get('/', (req, res, next) => res.redirect(process.env.FRONTEND_URL));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.log('global error', err.message, err.stack.substring(0, 30));
    const statusCode = err.status ? err.status : (err.code ? err.code : err.message === 'Not authorized' ? 401 : null);
    res.status(statusCode > 0 ? statusCode : 500);
    res.json({ success: false, error: err.message });
});

const port = process.env.PORT || 8081;
const server = http.createServer(app);
server.listen(port, () => console.log(`listening successfully on ${port}`));
