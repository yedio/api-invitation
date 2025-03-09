const url = require("url");
const express = require("express");
const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.end("Hello Express");
});

app.get("/", (_, res) => res.end("HOME"));
app.get("/user", user);
app.get("/feed", feed);

function user(req, res) {
  //호이스트를 위해 const가 아닌 function으로 변경
  const userInfo = url.parse(req.url, true).query;
  res.json(`[user] name : ${userInfo?.name}, age: ${userInfo?.age}`);
}

function feed(req, res) {
  res.json(`
      <ul>
      <li>picture1</li>
      <li>picture2</li>
      <li>picture3</li>
      </ul>
      `);
}

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end("404 page not found");
};
