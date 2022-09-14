"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const passport_vkontakte_1 = require("passport-vkontakte");
const app = express();
app.use(express.json());
passport.use(new passport_vkontakte_1.Strategy({
    clientID: '51424267',
    clientSecret: 'RvLBoRGOSVCM3WipBGxy',
    callbackURL: "http://localhost:3000/auth/vkontakte/callback"
}, function (accessToken, refreshToken, params, profile, done) {
    return done(null, accessToken);
}));
const PORT = 3000;
app.get("/auth/vkontakte", passport.authenticate("vkontakte", {
    scope: ["photos", "offline"],
}), function (req, res) {
    // The request will be redirected to vk.com for authentication, with
    // extended permissions.
});
app.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {
    failureRedirect: '/auth/vkontakte/error',
    session: false
}), function (req, res) {
    //console.log(req);
    console.log(String(req.user));
    //localStorage.setItem('token', String(req.user));
    res.json({ token: req.user });
});
// главная
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// ошибка авторизации
app.get('/auth/vkontakte/error', (req, res) => {
    res.sendFile(__dirname + '/error.html');
});
app.listen(PORT, () => {
    console.log('Сервер пашет на порту: ' + PORT);
});
