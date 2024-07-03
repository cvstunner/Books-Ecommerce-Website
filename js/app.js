const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config({ path: "./.env" });
const port = process.env.PORT || 1300;
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret_key',
  resave: true,
  saveUninitialized: false
}));

app.use("/", require("../api/pages"));
app.use("/auth", require("../api/auth"));
app.use("/sell", require("../api/sell"));
app.use("/api/admin", require("../api/admin"));
app.use("/api/trend", require("../api/trend"));
app.use("/api/user", require("../api/user"));
app.use("/api/product", require("../api/product"));
app.use("/api/wishlist", require("../api/wishlist"));
app.use("/api/cart", require("../api/cart"));
app.use("/query", require("../api/query"));
app.use("/api/populate", require("../api/populate"));
app.use("/images", require("../api/images"));
app.use("/upload", require("../api/upload"));
app.use("/api/payment", require("../api/payment"));
app.use("/api/order", require("../api/order"));
app.use('/css', express.static(path.join(__dirname, '..', 'assets', 'css')));
app.use('/icons', express.static(path.join(__dirname, '..', 'assets', 'icons')));
app.use('/images', express.static(path.join(__dirname, '..', 'assets', 'images')));
app.use('/fonts', express.static(path.join(__dirname, '..', 'css', 'fonts')));
app.use('/userData/images', express.static(path.join(__dirname, '..', 'userData', 'images')));

// console.log(path.join(__dirname, '..', 'css', 'images'));
let config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true
};

function connection() {
  let conn = mysql.createConnection(config);
  conn.connect();
  return conn;
}

connection();
function queryLoginStatus(value) {
  return value;
}

let queryLogin = (loginCreds, queryLoginStatus) => {
  console.log("op", loginCreds);
  let username = loginCreds[0];
  let password = loginCreds[1];
  console.log(username, typeof (username), password, typeof (password));
  let conn = connection();
  let sql = "Select @userId:= userId, password from users where username = ?;select 1 from admin where userId = @userId;";
  conn.connect(function (err) {
    if (err) throw err;
    console.log("Login Connected!");
    conn.query(sql, username, function (err, result) {
      console.log('result1: ', result[1]);
      if (err) throw err;
      // console.log('validate', password, result[0].password);

      if (Object.keys(result).length != 0) {
        bcrypt.compare(password, result[0][0].password, function (err, isMatch) {
          console.log('isMatch: ', isMatch)
          if (isMatch) {
            conn.end();
            console.log("Login Succesfully!");
            if (result[1].length === 0) {
              queryLoginStatus([result[0][0]['@userId:= userId'], null]);
            }
            else {
              queryLoginStatus([result[0][0]['@userId:= userId'], result[1]]);
            }
          }
          else if (!isMatch) {
            conn.end();
            console.log("Wrong Crediantials!");
            queryLoginStatus(null);
          }
        });
      }
      else {
        conn.end();
        console.log("User Not Exists!");
        queryLoginStatus(undefined);
      }
    });
  });
};

let querySignUp = (loginCreds, queryLoginStatus) => {
  console.log("op", loginCreds);
  let conn = connection();
  let sql = "Insert into users (name, age, gender, contact, email, username, password) Select ?, ?, ?, ?, ?, ?, ? where NOT EXISTS (Select * from users where username = ?)";
  conn.connect(function (err) {
    if (err) throw err;
    console.log("Login Connected!");
    conn.query(sql, loginCreds, function (err, result) {
      if (err) throw err;
      console.log("SignUp: ", result);
      if (Object.keys(result).length != 0 && result.affectedRows !== 0) {
        conn.end();
        console.log("Login Succesfully!");
        queryLoginStatus([result.insertId]);
      }
      else if (Object.keys(result).length != 0 && result.affectedRows === 0) {
        conn.end();
        console.log("username Already taken!");
        queryLoginStatus(undefined);
      }
    });
  });
};

let querySellPro = (loginCreds, queryLoginStatus) => {
  console.log("oppp", loginCreds);
  let conn = connection();
  let sql = "Insert into products (title, author, category, quantity, MRP_price, retail_price, userId, sellerId, dscpId, fileId, specId) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  conn.connect(function (err) {
    if (err) throw err;
    console.log("Login Connected!");
    conn.query(sql, loginCreds, function (err, result) {
      if (err) throw err;
      if (Object.keys(result).length != 0) {
        conn.end();
        console.log("Selled Succesfully!");
        queryLoginStatus(true);
      } else {
        conn.end();
        console.log("Wrong Crediantials!");
        queryLoginStatus(false);
      }
    });
  });
};

let selectQuery = (query, values, queryLoginStatus) => {
  console.log("oppp: ", values);
  let conn = connection();
  let qResult = null;
  conn.connect(function (err) {
    if (err) throw err;
    console.log("Login Connected!");
    conn.query(query, values, function (err, result) {
      if (err) {
        queryLoginStatus(undefined);
      }
      if (Object.keys(result).length != 0) {
        qResult = result;
        conn.end();
        queryLoginStatus(result);
      } else {
        conn.end();
        queryLoginStatus(null);
      }
    });
  });
};

let status = (query, values, queryLoginStatus) => {
  console.log("oppp");
  let conn = connection();
  let qResult = null;
  conn.connect(function (err) {
    if (err) throw err;
    console.log("Login Connected!");
    conn.query(query, values, function (err, result) {
      if (err) throw err;
      if (Object.keys(result).length != 0) {
        qResult = result;
        conn.end();
        queryLoginStatus(result);
      } else {
        conn.end();
        queryLoginStatus(null);
      }
    });
  });
};

app.listen(port, () => {
  console.log(`Server is Listening on Port ${port}`);
});

exports.queryLogin = queryLogin;
exports.querySignUp = querySignUp;
exports.querySellPro = querySellPro;
exports.selectQuery = selectQuery;
