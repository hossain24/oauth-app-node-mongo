const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    });
});

passport.use(
    new GoogleStrategy({
        // options for the Google start
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // check, if the user is already exist in the database
        console.log(profile);
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                console.log("User is exist: " + currentUser);
                done(null, currentUser);
            } else {
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.image.url
                }).save().then((newUser) => {
                    console.log("New user created: " + newUser)
                    done(null, newUser);
                })
            }
        })
    })
);

