const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const port = 3000;

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`);
});
