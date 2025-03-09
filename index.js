const http = require("http");
const url = require("url"); //url 모듈 로딩

const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname;
  res.setHeader("Content-Type", "text/html");

  if (path === "/user") {
    res.end("[user] name : andy, age: 30");
  } else if (path === "/feed") {
    res.end(`
      <ul>
      <li>picture1</li>
      <li>picture2</li>
      <li>picture3</li>
      </ul>
      `);
  } else {
    res.statusCode = 404;
    res.end("404 page not found");
  }
});

// 서버 시작, 접속 대기
server.listen(3000, () => console.log("OK!"));
