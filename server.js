const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var mysql = require("mysql");
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "myDb"
});

con.connect(function(err) {
  if (err) console.log("NOT ABLE TO CONNECT TO MYSQL , ERROR " + err);
});

app.get("/", (req, res) => {
  res.send({ express: "Express server up and running" });
});

app.get("/api/getAllUsers", (req, res) => {
  con.query('Select * from users where deleted_flag="N"', function(
    err,
    result,
    fields
  ) {
    if (err) res.send({ message: "Error. Please check db connection." });
    res.send({ message: "success", users: result });
  });
});

app.post("/api/updateUser", (req, res) => {
  console.log(req.body);
  var sql =
    'Update users set name = "' +
    req.body.name +
    '",dob = "' +
    req.body.dob +
    '" where id =' +
    req.body.id;
  console.log(sql);
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    if (result.affectedRows === 1) {
      res.send({ message: "success" });
    }
  });
});

app.post("/api/deleteUser", (req, res) => {
  var sql = 'Update users set deleted_flag = "Y" ' + "where id=" + req.body.id;
  console.log(sql);
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    if (result.affectedRows === 1) {
      res.send({ message: "success" });
    }
  });
});
app.post("/api/createUser", (req, res) => {
  var sql =
    'Insert into users (id,name,dob,displayImgUrl,deleted_flag) VALUE (null,"' +
    req.body.name +
    '","' +
    req.body.dob +
    '","https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg","N")';
  console.log(sql);
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    if (result.affectedRows === 1) {
      res.send({ message: "success" });
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
