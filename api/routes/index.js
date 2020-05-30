var express = require("express");
var router = express.Router();
const db = require("../utils/lowDb");

/* GET home page. */
router.get("/Z", function (req, res, next) {
  try {
    console.log("object");
    db.set("user.name", "typicode").write();
    db.get("posts").push({ id: 1, title: "lowdb is awesome" }).write();
    // res.render("index", { title: "Express" });
  } catch (error) {
    console.log(error);
  } finally {
    next();
  }
});

module.exports = router;
