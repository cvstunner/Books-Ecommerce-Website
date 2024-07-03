const express = require('express');
const app = express();
const fs = require('fs');
// const http = require('http');
// const url = require('url');

app.get('/', function (req, res) {
	res.send("hello world!");
});