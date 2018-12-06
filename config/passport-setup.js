const passport = require("passport");
const googleStrategy = require("passport-google-oauth20");
const keys = require("./keys");

passport.use(
    new googleStrategy({
        // options for the Google start
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log("Callback function is fired!");
        console.log(profile);
    })
);

