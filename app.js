const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const express = require("express");
const routes = require("./routes");
const exphbs = require("express-handlebars");

require("./config/mongoose");

const app = express();
app.use(methodOverride("_method"));
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

//! 路由監聽器
app.listen(3000, () => {
  console.log("Express app listening on http://localhost:3000");
});
