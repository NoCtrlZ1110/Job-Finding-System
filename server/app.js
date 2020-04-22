var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mysql = require('./db');

// var employeeFind = require('./routes/employee/find')
// var employeeCreate = require('./routes/employee/create')
// var employeeIdFind = require('./routes/employee/employeeId/findId')
// var employeeIdApply = require('./routes/employee/employeeId/apply')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// routeroute
// app.use('/employee', employeeFind);
// app.use('/employee', employeeCreate);
// app.use('/employee', employeeIdFind);
// app.use('/employee', employeeIdApply);

// employee
app.get('/employee/list',function(req,res) {
  var sql = 'select * from employer where apply is null';
  mysql.query(sql,function(err,response) 
  {
    res.json(response);
  });
});

app.post('/employee/create',function(req,res) {
  data = req.body;
  var sql = 'insert into employee(name,sex,age,area,address,job,job_detail,time,salary,talent,contact,comment) value (?,?,?,?,?,?,?,?,?,?,?,?)';
  mysql.query(sql,[data.name,data.sex,data.age,data.area,data.address,data.job,data.job_detail,data.time,data.salary,data.talent,data.contact,data.comment],function(err,response) {
    res.json('done');
  });          
});

app.get('/employee/find/:id', function(req,res) {
  var sql = "select * from employer where employer_id = ?";
  mysql.query(sql,[req.params.id],function(err,response) {
    res.json(response);
  })
});

app.all('/employee/find',function(req,res) {
  var data = req.body;
  var sql = 'select * from employer where area = ? and job = ? and time = ? and salary >= ? and apply is null';
  mysql.query(sql,[data.area, data.job, data.time, data.salary],function(err,response) {
    res.json(response);
  })
});

app.post('/employee/find/:id/apply', function(req,res) {
  var apply = req.body.apply;
  var sql = 'update employer set apply = ? where employer_id = ?';
  mysql.query(sql,[apply,req.params.id],function(err,response) {
    res.json('done');
  })
});

//employer
app.get('/employer/list',function(req,res) {
  var sql = 'select * from employee where apply is null';
  mysql.query(sql,function(err,response) 
  {
    res.json(response);
  });
});

app.post('/employer/create',function(req,res) {
  data = req.body;
  var sql = 'insert into employer(name,area,address,job,job_detail,time,salary,request,contact,comment) value (?,?,?,?,?,?,?,?,?,?)';
  mysql.query(sql,[data.name, data.area, data.address, data.job,data.job_detail,data.time,data.salary,data.request,data.contact,data.comment],function(err,response) {
    res.json('done');
  });
});

app.get('/employer/find/:id', function(req,res) {
  var sql = "select * from employee where employee_id = ?";
  mysql.query(sql,[req.params.id],function(err,response) {
    res.json(response);
  })
});

app.all('/employer/find',function(req,res) {
  var data = req.body;
  var sql = 'select * from employee where area = ? and job = ? and time = ? and salary <= ? and apply is null';
  mysql.query(sql,[data.area,data.job,data.time,data.salary],function(err,response) {
    res.json(response);
  })
});
app.post('/employer/find/:id/apply', function(req,res) {
  var email = req.body.email_i;
  var sql = 'update employee set apply = ? where employee_id = ?';
  mysql.query(sql,[email,req.params.id],function(err,response) {
    res.json('done');
  })
});


  
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
