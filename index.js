const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
  if (req.url === "/about") {
    filePath = path.join(__dirname, "about.html");
  } else if (req.url === "/contact-me") {
    filePath = path.join(__dirname, "contact-me.html");
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        filePath = path.join(__dirname, "404.html");
        fs.readFile(filePath, (err, content) => {
          res.writeHead(404, {
            "Content-Type": "text/html",
          });
          res.end(content, "utf-8");
        });
      } else {
        res.writeHead(500);
        res.end("Sever Error");
      }
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content, "utf-8");
    }
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
