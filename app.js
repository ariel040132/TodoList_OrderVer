const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
//引用body-parser
const bodyParser = require("body-parser");
//import express
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const Todo = require("./models/todo");
console.log(Todo);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//載入hbs引擎並套用模板
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//資料庫
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongobd error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

//用app.use 規定每一筆請求都需要透過 body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//MVC－Controller：負責串連 model 和 view
app.get("/", (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((todos) => res.render("index", { todos: todos })) // 將資料傳給 index 樣板
    .catch((error) => console.error(error)); //錯誤處理
});

app.get("/todos/new", (req, res) => {
  return res.render("new");
});
app.post("/todos", (req, res) => {
  const name = req.body.name; // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name }) // 存入資料庫
    .then(() => res.redirect("/")) // 新增完成後導回首頁
    .catch(() => console.log(error));
});

app.listen(3000, () => {
  console.log("Express app listening on http://localhost:3000");
});
