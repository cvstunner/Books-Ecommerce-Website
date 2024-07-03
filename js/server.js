const http = require("http");
const fs = require("fs");

const port = process.env.port || 1305;

const server = http.createServer((req, res) => {
  console.log("\n", req.url);
  if (req.url == "/") {
    console.log(req.url, "html");
    fs.readFile("../index.html", (err, data) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    });
  } else if (req.url == "/product.html") {
    console.log(req.url, "html");
    fs.readFile("../product.html", (err, data) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    });
  } else if (req.url == "/css/index.css") {
    fs.readFile("../css/index.css", (err, data) => {
      console.log(req.url, "css");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/css");
      res.write(data);
      res.end();
    });
  } else if (req.url == "/css/header.css") {
    fs.readFile("../css/header.css", (err, data) => {
      console.log(req.url, "css");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/css");
      res.write(data);
      res.end();
    });
  } else if (req.url == "/js/index.js") {
    fs.readFile("../js/index.js", (err, data) => {
      console.log(req.url, "js");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/js");
      res.write(data);
      res.end();
    });
  } else if (req.url == "/icons/srch2_b.png") {
    fs.readFile("../icons/srch2_b.png", (err, data) => {
      console.log(req.url, "png");
      res.statusCode = 200;
      res.setHeader("Content-Type", "img/png");
      res.write(data);
      res.end();
    });
  } else if (req.url == "/images/so_many_books.jpg") {
    fs.readFile("../images/so_many_books.jpg", (err, data) => {
      console.log(req.url, "jpg");
      res.statusCode = 200;
      res.setHeader("Content-Type", "img/jpg");
      res.write(data);
      res.end();
    });
  }
});
server.listen(port, () => {
  console.log(`Server is Listening on Port ${port}`);
});
