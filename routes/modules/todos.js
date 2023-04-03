// !引用 Express 和 express 路由器
const express = require("express");
const router = express.Router();
const Todo = require("../../models/todo");

//! 引入路由模組
//! 新增功能
router.get("/new", (req, res) => {
  return res.render("new");
});
//! 新增存檔功能
router.post("/", (req, res) => {
  const name = req.body.name; // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name }) // 存入資料庫
    .then(() => res.redirect("/")) // 新增完成後導回首頁
    .catch(() => console.log(error));
});
//! 詳細資訊功能
router.get("/:id", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean() //撈資料以後想用 res.render()，就要先用 .lean()
    .then((todo) => res.render("detail", { todo }))
    .catch((error) => console.log(error));
});

//! 編輯功能
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render("edit", { todo }))
    .catch((error) => console.log(error));
});
//! 編輯更新功能
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, isDone } = req.body;
  //id 要從網址上用 req.params.id 拿下來，而 name 要用 req.body.name 從表單拿出來。

  return Todo.findById(id)
    .then((todo) => {
      todo.name = name;
      todo.isDone = isDone === "on";
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.log(error));
});

//! 刪除功能
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});
//! 匯出路由
module.exports = router;
