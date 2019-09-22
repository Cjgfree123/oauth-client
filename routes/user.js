var express = require('express');
var router = express.Router();

// localhost:4000 访问
// /user/login 
router.get('/login', function (req, res, next) {
  res.render("login", { title: "登录" });
});

// /user/callback
router.get("/callback", function (req, res, next) {
  let { code } = req.query;
  
})

module.exports = router;
