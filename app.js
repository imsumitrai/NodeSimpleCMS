const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const logger = require('morgan');
// const multer = require('multer');
const csrf = require("csurf");
const MongoStore = require('connect-mongo')(session); 
const database = require('./config/database');
const db = database.db;
const mongoose = database.mongoose;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var postsRouter = require('./routes/posts');
var mediasRouter = require('./routes/medias');
var categoriesRouter = require('./routes/categories');
var authMiddleware = require('./middleware/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({ cookie: { 
//       maxAge: 60000 
//     }, 
//     secret: 'thisIsBestSecret',
//     resave: false, 
//     saveUninitialized: false
//   }));
  
app.use(session({
  secret: 'mongoSessionSecret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: db })
}));

app.use(flash());
// app.use(multer());
app.use(csrf());



app.use(function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.locals.csrftoken = req.csrfToken();
  res.locals.path = req.path;
  // console.log(req.csrfToken());
  next();
});

app.use(authMiddleware.auth);

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', usersRouter);
app.use('/', categoriesRouter);
app.use('/', mediasRouter);
// app.use('/users', usersRouter);
app.use('/', postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
