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
  let options = {
    redirect_uri,
    grant_type: 'authorization_code',
    client_id: appId,
    client_secret: appKey,
    code: "xxxxx",
  };
  let fullFetchTokenUrl = fetchTokenUrl + qs.stringify(options);
  logger("fullFetchTokenUrl", fullFetchTokenUrl);

  let res = await request(fullFetchTokenUrl);
  logger("res", res);
  // 1. 取得token
  let {
    access_token,
    expires_in,
    refresh_token,
  } = qs.parse(res);
  return res.send(FetchTokenUrlRes);

  options = {
    refresh_token,
    grant_type: "refresh_token",
    client_id: appId,
    client_secret: appKey,
  };

  let FetchTokenByRefreshTokenUrl = fetchTokenUrl + qs.stringify(options);
  let resByRefreshToken = await request(FetchTokenByRefreshTokenUrl);
  logger("resByRefreshToken", resByRefreshToken); // 假设成功, 响应体应该是: access_token=111&expires_in=yyy&refresh_token=123(新的access_token才能用)

  options = {
    access_token
  };
  let fullFetchMeUrl = fetchMeUrl + qs.stringify(options);
  logger("fullFetchMeUrl", fullFetchMeUrl);

  let fetchMeRes = await request(fetchMeUrl);
  logger("fetchMeRes", fetchMeRes); // 假设成功, 响应体应该是: 'callback( {"client_id":"YOUR_APPID","openid":"YOUR_OPENID"} );';

  // 2. 通过token 取得openId
  let {
    openid,
  } = JSON.parse(fetchMeRes.slice(fetchMeRes.indexOf("{"), fetchMeRes.lastIndexOf("}") + 1));
  console.log("openid", openid);
  return res.send(openid);

  /**
   * user info
   */
  options = {
    access_token,
    openid,
    oauth_consumer_key: appId,
  };
  let fullFetchUserInfo = fetchUserInfo + qs.stringify(options);
  let userInfoRes = await request(fullFetchUserInfo);
  console.log("user info", userInfoRes); // 假设成功，响应体应该如下
  let userInfo = JSON.parse(userInfoRes);
  res.json(userInfo);
});

module.exports = router;
