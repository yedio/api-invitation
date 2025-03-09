const express = require("express");
const app = express();
const port = 8080;
let posts = [];

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());
//POST 요청 시 컨텐트 타입이 application/x-www-form-urlencoded인 경우 파싱 (키=값 조합)
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const { title, name, text } = req.body;

  posts.push({
    id: posts.length + 1,
    title,
    name,
    text,
    createdAt: Date(),
  });

  res.json({ title, name, text });
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  const filteredPosts = posts.filter((post) => post.id !== +id); //+ 문자열을 숫자로 변경하는 작업
  const isLengthChanged = posts.length !== filteredPosts.length;

  posts = filteredPosts;
  if (isLengthChanged) {
    res.json("OK");
    return;
  }

  res.json("NOT CHANGED");
});
