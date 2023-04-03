//! 引入 express 和 route 模組
const express = require("express");
const router = express.Router();

//! 引入路由模組
const home = require("./modules/home");
router.use("/", home);
const todos = require("./modules/todos");
router.use("/todos", todos);

//! 匯出
module.exports = router;
