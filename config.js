module.exports = {
    appId: "5d945e4f49d7d10943941289",
    appKey: "ba96fff7-bf8c-49ae-a6fe-f80321b62789",
    access_token: "access_token",
    redirect_uri: "http://localhost:4000/user/callback",
    // 授权码authorize code
    authorizeUrl : "http://localhost:5000/oauth2.0/authorize?",
    // access_code
    fetchTokenUrl: "http://localhost:5000/oauth2.0/token?",
    // openId
    fetchMeUrl: "http://localhost:5000/oauth2.0/me?",
    fetchUserInfo: "http://localhost:5000/user/get_user_info?",
};