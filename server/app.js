var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var mysql = require("./db");
var app = express();

//
const favicon = require("express-favicon");

app.use(favicon(__dirname + "/../client/build/favicon.ico"));
app.use(express.static(__dirname + "/../client"));
app.use(express.static(path.join(__dirname + "/../client", "build")));
app.get("/ping", function (req, res) {
  return res.send("Ok!");
});

// view engine setup
app.use(cors());
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

setInterval(function () {
  mysql.query("SELECT 1");
}, 5000);

// employee
app.get("/employee/list", function (req, res) {
  var sql = "select * from employee where apply is null";
  mysql.query(sql, function (err, response) {
    res.json(response);
  });
});

app.post("/employee/create", function (req, res) {
  var data = req.body;
  console.log(data);

  var sql =
    "insert into employee(name,sex,age,area,address,job,job_detail,time,salary,talent,contact,comment) value (?,?,?,?,?,?,?,?,?,?,?,?)";
  mysql.query(
    sql,
    [
      data.name,
      data.sex,
      data.age,
      data.area,
      data.address,
      data.job,
      data.job_detail,
      data.time,
      data.salary,
      data.talent,
      data.contact,
      data.comment,
    ],
    function (err, response) {
      res.json("done");
    }
  );
});

app.get("/employee/find/:id", function (req, res) {
  var sql = "select * from employer where employer_id = ?";
  mysql.query(sql, [req.params.id], function (err, response) {
    res.json(response);
  });
});

app.all("/employee/find", function (req, res) {
  var data = req.body;
  var sql =
    "select * from employer where area = ? and job = ? and time = ? and salary >= ? and apply is null";

  mysql.query(sql, [data.area, data.job, data.time, data.salary], function (
    err,
    response
  ) {
    res.json(response);
  });
});

app.post("/employee/find/:id/apply", function (req, res) {
  var apply = req.body.apply;
  var sql = "update employer set apply = ? where employer_id = ?";
  mysql.query(sql, [apply, req.params.id], function (err, response) {
    res.json("done");
  });
});

//employer ------

app.get("/employer/list", function (req, res) {
  var sql = "select * from employer where apply is null";
  mysql.query(sql, function (err, response) {
    res.json(response);
  });
});

app.post("/employer/create", function (req, res) {
  var data = req.body;
  console.log(data);

  var sql =
    "insert into employer(name,area,address,job,job_detail,time,salary,request,contact,comment) value (?,?,?,?,?,?,?,?,?,?)";
  mysql.query(
    sql,
    [
      data.name,
      data.area,
      data.address,
      data.job,
      data.job_detail,
      data.time,
      data.salary,
      data.request,
      data.contact,
      data.comment,
    ],
    function (err, response) {
      res.json("done");
    }
  );
});

app.get("/employer/find/:id", function (req, res) {
  var sql = "select * from employee where employee_id = ?";
  mysql.query(sql, [req.params.id], function (err, response) {
    res.json(response);
  });
});

app.all("/employer/find", function (req, res) {
  var data = req.body;
  var search = [];
  var string = "select * from employee where ";
  let count = 0;
  if (data.area) {
    search.push(data.area);
    string += "area = ? ";
    count++;
  }
  if (data.job) {
    search.push(data.job);
    if (count > 0) string += "and job = ? ";
    else string += "job = ? ";
    count++;
  }
  if (data.time) {
    search.push(data.time);
    if (count > 0) string += "and time = ? ";
    else string += "time = ? ";
    count++;
  }
  if (data.salary) {
    search.push(data.salary);
    if (count > 0) string += "and salary <= ? ";
    else string += "salary <= ? ";
    count++;
  }
  var sql = string + "and apply is null";
  console.log(sql + "-" + count);

  mysql.query(sql, search, function (err, response) {
    res.json(response);
  });
});
app.post("/employer/find/:id/apply", function (req, res) {
  var email = req.body.email_i;
  var sql = "update employee set apply = ? where employee_id = ?";
  mysql.query(sql, [email, req.params.id], function (err, response) {
    res.json("done");
  });
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/../client", "build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
