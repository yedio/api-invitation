const http = require("http");
const url = require("url"); //url 모듈 로딩

const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname;
  res.setHeader("Content-Type", "text/html");

  if (path in urlMap) {
    urlMap[path](req, res);
  } else {
    notFound(req, res);
  }
});

// 서버 시작, 접속 대기
server.listen(3000, () => console.log("OK!"));

const user = (req, res) => {
  //라우터 동적 처리
  const userInfo = url.parse(req.url, true).query; 
  res.end(`[user] name : ${userInfo?.name}, age: ${userInfo?.age}`);
};

const feed = (req, res) => {
  res.end(`
      <ul>
      <li>picture1</li>
      <li>picture2</li>
      <li>picture3</li>
      </ul>
      `);
};

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end("404 page not found");
};

//라우터 규칙
const urlMap = {
  "/": (req, res) => res.end("HOME"),
  "/user": user,
  "/feed": feed,
};
