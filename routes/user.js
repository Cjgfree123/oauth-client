var express = require('express');
const qs = require('querystring');
const { appId, appKey, redirect_uri, authorizeUrl, fetchTokenUrl, fetchMeUrl, fetchUserInfo } = require('../config');
var router = express.Router();

// localhost:4000 访问

// /user/login 
router.get('/login', function (req, res, next) {
  let options = {
    redirect_uri,
    response_type: "code", // 响应类型 固定位code
    client_id: appId, // 客户端的id,这个id是QQ授权服务器进行分配的
    scope: "get_user_info, list_album",
  };
  let query = qs.stringify(options);
  fullAuthorizeUrl = authorizeUrl + query;
  res.render('login', {
    fullAuthorizeUrl,
    title: "登录",
  });
});

// /user/callback
router.get("/callback", function (req, res, next) {
  let { code } = req.query;
});

module.exports = router;
