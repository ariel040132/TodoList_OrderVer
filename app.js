const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

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

//路由
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

app.get("/", (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((todos) => res.render("index", { todos: todos })) // 將資料傳給 index 樣板
    .catch((error) => console.error(error)); //錯誤處理
});

app.listen(3000, () => {
  console.log("Express app listening on http://localhost:3000");
});
