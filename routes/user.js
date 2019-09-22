var express = require('express');
var router = express.Router();

// /user/login 
router.get('/login', function (req, res, next) {
  res.render("login", { title: "登录" });
});

module.exports = router;
