var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var session = require("express-session");

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

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

setInterval(function () {
  mysql.query("SELECT 1");
}, 5000);

// employee
// truy cập /employee cho tự động nhảy đến employee/login
// login
app.all("/employee/login", function (req, res) {
  var data = req.body;
  var username = data.username;
  var password = data.password;
  if (username && password) {
    mysql.query(
      "SELECT employeeId FROM employeeaccount WHERE username = ? AND password = ?",
      [username, password],
      function (error, response) {
        if (response.length > 0) {
          req.session.employeeId = response[0].employeeId;
          res.json("ok");
        } else {
          res.json("Incorrect account and/or Password!");
        }
        res.end();
      }
    );
  } else {
    res.json("Please enter account and Password!");
    res.end();
  }
});

//register
//đăng kí xong trở lại trang đăng nhập
app.post("/employee/register", function (req, res) {
  var data = req.body;
  var username = data.username;
  var password = data.password;
  if (username && password) {
    mysql.query(
      "call create_employee_account(?,?);",
      [username, password],
      function (error) {
        if (error) {
          res.json("fall to register");
        } else {
          res.json("register done. please return to login");
        }
        res.end();
      }
    );
  } else {
    res.json("Please enter account and Password!");
    res.end();
  }
});

// employee profile
app.get("/employee/profile", function (req, res) {
  if (req.session.employeeId) {
    var sql = "select *\
    from employee\
    where employeeId = ?";
    mysql.query(sql, [req.session.employeeId], function (err, response) {
      res.json(response);
      res.end();
    });
  } else {
    res.json("no account");
  }
});
app.post("/employee/profile", function (req, res) {
  if (req.session.employeeId) {
    var data = req.body;
    var sql = "call set_employee(?,?,?,?,?,?,?,?)";
    mysql.query(
      sql,
      [
        req.session.employeeId,
        data.name,
        data.sex,
        data.age,
        data.area,
        data.address,
        data.phone,
        data.email,
      ],
      function (err, response) {
        res.json("ok");
      }
    );
  } else {
    res.json("no account");
  }
});
// employee job
app.get("/employee/job", function (req, res) {
  if (req.session.employeeId) {
    var sql = "select *\
    from employeejob\
    where employeeId = ?";
    mysql.query(sql, [req.session.employeeId], function (err, response) {
      res.json(response);
    });
  } else {
    res.json("no account");
  }
});
app.post("/employee/job", function (req, res) {
  if (req.session.employeeId) {
    var data = req.body;
    var sql = "call set_employeejob(?,?,?,?,?,?,?)";
    mysql.query(
      sql,
      [
        req.session.employeeId,
        data.job,
        data.jobDetail,
        data.time,
        data.salary,
        data.talent,
        data.comment,
      ],
      function (err, response) {
        res.json("done");
      }
    );
  } else {
    res.json("no account");
  }
});
// employee find
app.get("/employee/find/:id", function (req, res) {
  if (req.session.employeeId) {
    var sql =
      "select employerJobId,name,area,address,phone,email,nameJob,\
      (count-(select count(*) from apply where employerJobId=employer.employerId and employee_accept=1)) as count,\
      job,jobDetail,time,dateStart,salary,`require`,comment\
      from employer inner join employerjob\
      on employer.employerId = employerjob.employer\
      where count > (select count(*) from apply where employerJobId=employer.employerId and employee_accept=1)\
      and employerJobId = ?";
    mysql.query(sql, [req.params.id], function (err, response) {
      res.json(response);
    });
  } else {
    res.json("no account");
  }
});

app.get("/employee/find", function (req, res) {
  if (req.session.employeeId) {
    var sql =
      "select employerJobId,name,nameJob,\
      (count-(select count(*) from apply where employerJobId=employer.employerId and employee_accept=1)) as count,\
      job,jobDetail,time,salary\
      from employer inner join employerjob\
      on employer.employerId = employerjob.employer\
      where count > (select count(*) from apply where employerJobId=employer.employerId and employee_accept=1)\
      and job=(select job from employeejob where employeeId = ?)\
      and time=(select time from employeejob where employeeId = ?)\
      and area=(select area from employee where employeeId = ?)";
    mysql.query(
      sql,
      [req.session.employeeId, req.session.employeeId, req.session.employeeId],
      function (err, response) {
        if (response) res.json(response);
        else res.json("no job for you");
      }
    );
  } else {
    res.json("no account");
  }
});
// list các cty đợi bạn chấp nhận công việc
app.get("/employee/apply_list", function (req, res) {
  if (req.session.employeeId) {
    var sql =
      "select employerjob.employerJobId,name,nameJob,\
      (count-(select count(*) from apply where employerjob.employerJobId=employer.employerId and employee_accept=1)) as count,\
      job,jobDetail,time,salary\
      from employer\
      inner join employerjob on employer.employerId = employerjob.employer\
      inner join apply on apply.employerJobId=employerjob.employerJobId and apply.employeeId = ? and apply.employer_invite=1 and apply.employee_accept=0\
      where count > (select count(*) from apply where employerJobId=employer.employerId and employee_accept=1)";
    mysql.query(sql, [req.session.employeeId], function (err, response) {
      res.json(response);
    });
  } else res.json("no account");
});
//  gửi hồ sơ đến công ty hoặc chấp nhận tuyển việc
app.post("/employee/find/:id/submit_apply", function (req, res) {
  if (req.session.employeeId) {
    var sql = "call employee_submit_apply(?,?)";
    mysql.query(sql, [req.session.employeeId, req.params.id], function (
      err,
      response
    ) {
      res.json("done");
    });
  } else req.json("no account");
});
// từ chối lời mời làm việc
app.post("/employee/find/:id/ignore", function (req, res) {
  if (req.session.employeeId) {
    var sql = "call employee_ignore(?,?)";
    mysql.query(sql, [req.session.employeeId, req.params.id], function (
      err,
      response
    ) {
      res.json("done");
    });
  } else req.json("no account");
});
// công việc bạn nhận
app.get("employee/accept", function (req, res) {
  if (req.session.employeeId) {
    var sql =
      "select employerjob.employerJobId,name,nameJob,\
    job,jobDetail,time,salary\
    from employer\
    inner join employerjob on employer.employerId = employerjob.employer\
    inner join apply on apply.employerJobId=employerjob.employerJobId and apply.employeeId = ? and apply.employer_invite=1 and apply.employee_accept=1";
    mysql.query(sql, [req.session.employeeId], function (err, response) {
      res.json(response);
    });
  } else res.json("no account");
});
// logout
app.post("employee/logout", function (req, res) {
  req.session.destroy();
  // return /home
});
//employer ------
// employer
// truy cập /employer cho tự động nhảy đến employer/login
// login
app.all("/employer/login", function (req, res) {
  var data = req.body;
  var username = data.username;
  var password = data.password;
  if (username && password) {
    mysql.query(
      "SELECT employerId FROM employeraccount WHERE username = ? AND password = ?",
      [username, password],
      function (error, response) {
        if (response) {
          req.session.employerId = response[0].employerId;
          res.json("ok");
        } else {
          res.json("Incorrect account and/or Password!");
        }
        res.end();
      }
    );
  } else {
    res.json("Please enter account and Password!");
    res.end();
  }
});

//register
//đăng kí xong trở lại trang đăng nhập
app.post("/employer/register", function (req, res) {
  var data = req.body;
  var username = data.username;
  var password = data.password;
  if (username && password) {
    mysql.query(
      "call create_employer_account(?,?);",
      [username, password],
      function (error) {
        if (error) {
          res.json("fall to register");
        } else {
          res.json("register done. please return to login");
        }
        res.end();
      }
    );
  } else {
    res.json("Please enter account and Password!");
    res.end();
  }
});

// employer profile
app.get("/employer/profile", function (req, res) {
  if (req.session.employerId) {
    var sql = "select *\
      from employer\
      where employeeId = ?";
    mysql.query(sql, [req.session.employerId], function (err, response) {
      res.json(response);
      res.end();
    });
  } else {
    res.json("no account");
  }
});
app.post("/employer/profile", function (req, res) {
  if (req.session.employerId) {
    var data = req.body;
    var sql = "call set_employee(?,?,?,?,?,?)";
    mysql.query(
      sql,
      [
        req.session.employerId,
        data.name,
        data.area,
        data.address,
        data.phone,
        data.email,
      ],
      function (err, response) {
        res.json("ok");
      }
    );
  } else {
    res.json("no account");
  }
});
// employer job
// list namejob
app.get("/employer/job", function (req, res) {
  if (req.session.employeeId) {
    var sql =
      "select employerJobId,namejob\
      from employerjob\
      where employer = ?";
    mysql.query(sql, [req.session.employerId], function (err, response) {
      res.json(response);
    });
  } else {
    res.json("no account");
  }
});
// job detail
app.get("/employee/job/:id", function (req, res) {
  if (req.session.employreId) {
    var sql =
      "select * from employerjob where employerJobId= ? and employer = ?";
    mysql.query(sql, [req.params.id, res.session.employerId], function (
      err,
      response
    ) {
      res.json(response);
    });
  } else res.json("no account");
});
app.post("/employer/job/:id", function (req, res) {
  if (req.session.employerId) {
    var data = req.body;
    var sql = "call set_employeejob(?,?,?,?,?,?,?)";
    mysql.query(
      sql,
      [
        req.session.employerId,
        data.job,
        data.jobDetail,
        data.time,
        data.salary,
        data.talent,
        data.comment,
      ],
      function (err, response) {
        res.json("done");
      }
    );
  } else {
    res.json("no account");
  }
});

/// old
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
