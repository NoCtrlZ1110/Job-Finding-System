/* eslint-disable no-multi-str */
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
// app.use(cors());

app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secretsadfasdioaujweirwlae",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    credentials: true, // enable set cookie
  })
);

// employee ------------------------------------------------------------------------------

app.all("/status", function (req, res) {
  if (req.session.status) {
    res.json("LOGGED");
  } else {
    res.json("NOTLOGGED");
  }
});

app.all("/currentAccount", (req, res) => {
  if (req.session.status) {
    if (req.session.currentAccount.type === "employee") {
      if (req.session.employeeId) {
        let sql = "select *\
        from employee\
        where employeeId = ?";
        mysql.query(sql, [req.session.employeeId], function (err, response) {
          response = response[0];
          response.type = "employee";
          res.json(response);
          res.end();
        });
      }
    } else if (req.session.currentAccount.type === "employer") {
      if (req.session.employerId) {
        let sql = "select *\
        from employer\
        where employerId = ?";
        mysql.query(sql, [req.session.employerId], function (err, response) {
          response = response[0];
          response.type = "employer";
          res.json(response);
          res.end();
        });
      }
    }
    // res.send(req.session.currentAccount);
  } else res.send("NOTLOGGED");
});

app.all("/currentRole", (req, res) => {
  if (req.session.currentAccount) {
    res.send(req.session.currentAccount.type);
  } else res.send("NOTLOGGED");
});
// truy cập /employee cho tự động nhảy đến employee/login
// login
app.all("/employee/login", function (req, res) {
  var data = req.body;
  var username = data.username;
  var password = data.password;
  if (username && password) {
    mysql.query(
      "SELECT employeeId FROM employeeaccount WHERE username = ? AND password = ?",
      /*  `SELECT e.* FROM employeeaccount ea
      JOIN employee e ON ea.employeeId = e.employeeId
      WHERE ea.username = ? AND ea.password = ?
      ;`, */
      [username, password],
      function (error, response) {
        if (response.length > 0) {
          console.log(response);
          req.session.status = "LOGGED";
          req.session.currentAccount = response[0];
          req.session.currentAccount.type = "employee";
          req.session.employeeId = response[0].employeeId;
          res.json("Đăng nhập thành công!");
          console.log(req.session);
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
          res.json("Đăng ký thất bại!\nHãy thử lại.");
        } else {
          res.json("Đăng ký thành công!\nĐăng nhập ngay.");
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
    res.json("NOTLOGGED");
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
    res.json("NOTLOGGED");
  }
});
// employee job
app.get("/employee/job", function (req, res) {
  if (req.session.employeeId) {
    var sql = "select *\
    from employeejob\
    where employeeId = ?";
    mysql.query(sql, [req.session.employeeId], function (err, response) {
      res.json(response[0]);
    });
  } else {
    res.json("NOTLOGGED");
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
    res.json("NOTLOGGED");
  }
});
// employee find
// chi tiet 1 cong viec
app.get("/employee/find/:id", function (req, res) {
  console.log(req.session);

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
      res.json(response[0]);
    });
  } else {
    res.json("NOTLOGGED");
  }
});
// list cong viec phu hop
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
    res.json("NOTLOGGED");
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
  } else res.json("NOTLOGGED");
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
  } else res.json("NOTLOGGED");
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
  } else res.json("NOTLOGGED");
});
// công việc bạn nhận
app.get("/employee/accept", function (req, res) {
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
  } else res.json("NOTLOGGED");
});
// nghỉ việc
app.post("/employee/quit", function (req, res) {
  if (req.session.employeeId) {
    var sql = "delete from apply where employeeId = ?";
    mysql.query(sql, [req.session.employeeId], function (err, response) {
      res.json("it's ok. Find new job.");
    });
  } else res.json("NOTLOGGED");
});
// logout
app.all("/logout", function (req, res) {
  req.session.destroy();
  res.send("Logged out!");
  // return /home
});

app.all("/employee/logout", function (req, res) {
  req.session.destroy();
  res.send("Logged out!");
  // return /home
});
//employer -------------------------------------------------------------------------------------
// employer
// truy cập /employer cho tự động nhảy đến employer/login
// login
app.all("/employer/login", function (req, res) {
  var data = req.body;
  var username = data.username;
  var password = data.password;
  if (username && password) {
    mysql.query(
      /* `SELECT e.* FROM employeraccount ea
      JOIN employer e ON ea.employerId = e.employerId
      WHERE ea.username = ? AND ea.password = ?
      ;`,
      [username, password], */
      "SELECT employerId FROM employeraccount WHERE username = ? AND password = ?",
      [username, password],
      function (error, response) {
        console.log(response);

        if (response.length > 0) {
          req.session.status = "LOGGED";
          req.session.currentAccount = response[0];
          req.session.currentAccount.type = "employer";
          req.session.employerId = response[0].employerId;
          res.json("Đăng nhập thành công!");
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
          res.json("Đăng ký thất bại!\nPlease try again!");
        } else {
          res.json("Đăng ký thành công!\nĐăng nhập ngay.");
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
      where employerId = ?";
    mysql.query(sql, [req.session.employerId], function (err, response) {
      res.json(response);
      res.end();
    });
  } else {
    res.json("NOTLOGGED");
  }
});
app.post("/employer/profile", function (req, res) {
  if (req.session.employerId) {
    var data = req.body;
    var sql = "call set_employer(?,?,?,?,?,?)";
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
        console.log(data);

        res.json("ok");
      }
    );
  } else {
    res.json("NOTLOGGED");
  }
});
// employer job
// list namejob
app.get("/employer/job", function (req, res) {
  if (req.session.employerId) {
    var sql =
      "select employerJobId,namejob\
      from employerjob\
      where employer = ?";
    mysql.query(sql, [req.session.employerId], function (err, response) {
      res.json(response);
    });
  } else {
    res.json("NOTLOGGED");
  }
});
// job detail
app.get("/employer/job/:id", function (req, res) {
  if (req.session.employerId) {
    var sql =
      "select *,\
      (count-(select count(*) from apply where employerJobId=? and employee_accept=1)) as valid\
       from employerjob \
       where employerJobId= ? and employer = ?";
    mysql.query(
      sql,
      [req.session.employerId, req.params.id, req.session.employerId],
      function (err, response) {
        if (response.length > 0) {
          res.json(response[0]);
        } else res.json("not your job");
      }
    );
  } else res.json("NOTLOGGED");
});

//create job
app.post("/employer/job/create", function (req, res) {
  if (req.session.employerId) {
    var data = req.body;
    var sql = "call create_employerjob(?,?,?,?,?,?,?,?,?,?)";
    mysql.query(
      sql,
      [
        data.namejob,
        data.count,
        data.job,
        data.jobDetail,
        data.time,
        data.dateStart,
        data.salary,
        data.require,
        data.comment,
        req.session.employerId,
      ],
      function (err, response) {
        res.json("done");
      }
    );
  } else res.json("NOTLOGGED");
});

// find slave :))
app.get("/employer/job/:id/find", function (req, res) {
  if (req.session.employerId) {
    var check =
      "select * from employerjob where employerJobId = ? and employer = ?";
    var sql =
      "select employee.employeeId,name,job,jobDetail,salary\
              from employee\
              inner join employeejob on employee.employeeId=employeejob.employeeId\
              where name != 'yourname' and\
              not exists(select * from apply where employeeId = employee.employeeId and employee_accept = 1)\
              and job=(select job from employerjob where employerJobId = ?)\
              and time=(select time from employerjob where employerJobId = ?)\
              and area=(select area from employer where employerId = ?)";
    mysql.query(check, [req.params.id, req.session.employerId], function (
      err,
      response1
    ) {
      if (response1.length > 0) {
        mysql.query(
          sql,
          [req.params.id, req.params.id, req.session.employerId],
          function (err, response) {
            if (response.length > 0) res.json(response);
            else res.json("not found");
          }
        );
      } else res.json("it's not your job");
    });
  } else res.json("NOTLOGGED");
});
//chi tiet
app.get("/employer/job/:id1/find/:id2", function (req, res) {
  if (req.session.employerId) {
    var check =
      "select * from employerjob where employerJobId = ? and employer = ?";
    var sql =
      "select employee.*,job,jobDetail,time,salary,talent,comment\
              from employee\
              inner join employeejob on employee.employeeId=employeejob.employeeId\
              where employee.employeeId = ?";
    mysql.query(check, [req.params.id1, req.session.employerId], function (
      err,
      response1
    ) {
      if (response1.length > 0) {
        mysql.query(sql, [req.params.id2], function (err, response) {
          if (response) res.json(response);
          else res.json("not found");
        });
      } else res.json("it's not your job");
    });
  } else res.json("NOTLOGGED");
});
// moi lam viec
app.post("/employer/job/:id1/find/:id2/invite", function (req, res) {
  if (req.session.employerId) {
    var check =
      "select * from employerjob where employerJobId = ? and employer = ?";
    var sql = "call employer_invite_apply(?,?)";
    mysql.query(check, [req.params.id1, req.session.employerId], function (
      err,
      response1
    ) {
      if (response1.length > 0)
        mysql.query(sql, [req.params.id2, req.params.id1], function (
          err,
          response
        ) {
          res.json("ok");
        });
      else res.json("it's not your job");
    });
  } else res.json("NOTLOGGED");
});
// tu choi
app.post("/employer/job/:id1/find/:id2/ignore", function (req, res) {
  if (req.session.employerId) {
    var check =
      "select * from employerjob where employerJobId = ? and employer = ?";
    var sql = "call employer_ignore(?,?)";
    mysql.query(check, [req.params.id1, req.session.employerId], function (
      err,
      response1
    ) {
      if (response1.length > 0)
        mysql.query(sql, [req.params.id2, req.params.id1], function (
          err,
          response
        ) {
          res.json("ok");
        });
      else res.json("it's not your job");
    });
  } else res.json("NOTLOGGED");
});
// list các hồ sơ xin việc
app.get("/employer/job/:id/submit_list", function (req, res) {
  if (req.session.employerId) {
    var check =
      "select * from employerjob where employerJobId = ? and employer = ?";
    var sql =
      "select employee.employeeId,name,job,jobDetail,salary\
    from employee\
    inner join employeejob on employee.employeeId=employeejob.employeeId\
    where name != 'yourname' and\
    exists(select * from apply where employeeId = employee.employeeId and employerJobId = ? and employer_invite =0);";
    mysql.query(check, [req.params.id, req.session.employerId], function (
      err,
      response1
    ) {
      if (response1.length > 0)
        mysql.query(sql, [req.params.id], function (err, response) {
          if (response.length > 0) res.json(response);
          else res.json("no submit");
        });
      else res.json("it's not your job");
    });
  } else res.json("NOTLOGGED");
});
// list các hồ sơ trúng tuyển
app.get("/employer/job/:id/accept_list", function (req, res) {
  if (req.session.employerId) {
    var check =
      "select * from employerjob where employerJobId = ? and employer = ?";
    var sql =
      "select employee.employeeId,name,job,jobDetail,salary\
    from employee\
    inner join employeejob on employee.employeeId=employeejob.employeeId\
    where name != 'yourname' and\
    exists(select * from apply where employeeId = employee.employeeId and employerJobId = ? and employee_accept=1);";
    mysql.query(check, [req.params.id, req.session.employerId], function (
      err,
      response1
    ) {
      if (response1.length > 0)
        mysql.query(sql, [req.params.id], function (err, response) {
          if (response.length) res.json(response);
          else res.json("no accept");
        });
      else res.json("it's not your job");
    });
  } else res.json("NOTLOGGED");
});
// đuổi việc
app.post("/employer/job/:id1/find/:id2/fire", function (req, res) {
  if (req.session.employerId) {
    var check =
      "select * from employerjob where employerJobId = ? and employer = ?";
    var sql = "delete from apply where employeeId = ? and employerJobId = ?)";
    mysql.query(check, [req.params.id1, req.session.employerId], function (
      err,
      response1
    ) {
      if (response1.length > 0)
        mysql.query(sql, [req.params.id2, req.params.id1], function (
          err,
          response
        ) {
          res.json("ok");
        });
      else res.json("it's not your job");
    });
  } else res.json("NOTLOGGED");
});
//logout
app.all("/employer/logout", function (req, res) {
  req.session.destroy();
  res.send("Logged out!");
  // return /home
});

// --- PLUS ---
//employee
//lọc các công việc
app.all("/employee/filter_job", function (req, res) {
  if (req.session.employeeId) {
    var sql =
      "select employerJobId,name,nameJob,\
    (count-(select count(*) from apply where employerJobId=employer.employerId and employee_accept=1)) as count,\
    area,job,jobDetail,time,salary\
    from employer inner join employerjob\
    on employer.employerId = employerjob.employer\
    where count > (select count(*) from apply where employerJobId=employer.employerId and employee_accept=1)";
    var data = req.body;
    if (data.job) sql += " and job = '" + String(data.job) + "'";
    if (data.area) sql += " and area = '" + String(data.area) + "'";
    if (data.time) sql += " and time = '" + String(data.time) + "'";
    mysql.query(sql, function (err, response) {
      if (response.length) res.json(response);
      else res.json("no result");
    });
  } else res.json("NOTLOGGED");
});
//list các công việc
app.get("/employee/list_job", function (req, res) {
  if (req.session.employeeId) {
    var sql =
      "select employerJobId,name,nameJob,\
    (count-(select count(*) from apply where employerJobId=employer.employerId and employee_accept=1)) as count,\
    area,job,jobDetail,time,salary\
    from employer inner join employerjob\
    on employer.employerId = employerjob.employer\
    where count > (select count(*) from apply where employerJobId=employer.employerId and employee_accept=1)";
    mysql.query(sql, function (err, response) {
      if (response.length) res.json(response);
      else res.json("no result");
    });
  } else res.json("NOTLOGGED");
});
//employer---
// list các ứng viên
app.get("/employer/list_candidate", function (req, res) {
  if (req.session.employerId) {
    var sql =
      "select employee.employeeId,age,name,area,job,jobDetail,salary\
      from employee\
      inner join employeejob on employee.employeeId=employeejob.employeeId\
      where name != 'yourname' and\
      not exists(select * from apply where employeeId = employee.employeeId and employee_accept = 1)";
    mysql.query(sql, function (err, response) {
      if (response.length) res.json(response);
      else res.json("no result");
    });
  } else res.json("NOTLOGGED");
});
// lọc các ứng viên
app.all("/employer/filter_candidate", function (req, res) {
  if (req.session.employerId) {
    var sql =
      "select employee.employeeId,name,area,job,jobDetail,salary\
      from employee\
      inner join employeejob on employee.employeeId=employeejob.employeeId\
      where name != 'yourname' and\
      not exists(select * from apply where employeeId = employee.employeeId and employee_accept = 1)";
    var data = req.body;
    if (data.job) sql += "and job = '" + String(data.job) + "'";
    if (data.area) sql += "and area = '" + String(data.area) + "'";
    if (data.time) sql += "and time = '" + String(data.time) + "'";
    mysql.query(sql, function (err, response) {
      if (response.length) res.json(response);
      else res.json("no result");
    });
  } else res.json("NOTLOGGED");
});

// ---

app.get("/employer/find/:id", function (req, res) {
  if (req.session.employerId) {
    var sql =
      "select employee.*,job,jobDetail,time,salary,talent,comment\
                      from employee\
                      inner join employeejob on employee.employeeId=employeejob.employeeId\
                      where employee.employeeId = ?";
    mysql.query(sql, [req.params.id], function (err, response) {
      if (response) res.json(response[0]);
      else res.json("not found");
    });
  } else res.json("NOTLOGGED");
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

setInterval(function () {
  mysql.query("SELECT 1");
}, 2000);

module.exports = app;
