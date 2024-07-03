var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(session({secret: "Your secret key", resave: true, saveUninitialized: true}));

var database = [{username: 'chetan', password: 'pswd'}];

app.get('/', function(req, res){
	fs.readFile('index.html', function(err, data) {
   		res.write(data);
   		res.end();
	});
});

app.post('/login', function(req, res){
   if(!req.body.username || !req.body.password){
      res.status("400");
      res.send("Invalid details!");
   } else {
      database.filter(function(user){
         if(user.username === req.body.username && user.password === req.body.password){
            res.send("login Successfully!");
      		req.session.user = {id: req.body.username, password: req.body.password};
         }
         else{
            res.send("login Failed!");
         }
      });
   }
});

app.listen(8080, function() {
	console.log('Server listening!');
}); 
