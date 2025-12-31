const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

http.createServer((req, res) => {
  let filePath = req.url === "/" ? "/index.html" : req.url;
  filePath = "." + filePath;

  const ext = path.extname(filePath);
  const type = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript"
  }[ext] || "text/plain";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("404 Not Found");
    } else {
      res.writeHead(200, { "Content-Type": type });
      res.end(content);
    }
  });
}).listen(PORT, () => {
  console.log(`🚀 Server running → http://localhost:${PORT}`);
});
