const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//import express
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

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
  res.render("index");
});

app.listen(3000, () => {
  console.log("Express app listening on http://localhost:3000");
});
