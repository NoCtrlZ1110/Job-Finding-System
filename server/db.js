const con = require('mysql');

var db = con.createConnection({
    host: "us-cdbr-iron-east-01.cleardb.net",
    user: "b5345d3d3a347d",
    password: "f3f59601",
    database:"heroku_377db09dae9da68",
    port: "3306"
  });

module.exports = db;