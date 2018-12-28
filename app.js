const express = require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

// setting up view engine
app.set("view engine", "ejs");

// setting up cookie key
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initilize passport
app.use(passport.initialize());
app.use(passport.session());

// setting up mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log("conneted to the database")
})

// setting up auth routes
app.use("/auth", authRoutes);

// setting up profile routes
app.use("/profile", profileRoutes);

// setting up home route
app.get("/", (req, res) => {
    res.render("home", { user: req.user });
});

// setting up about route
app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, () => {
    console.log("The server is listening on port 3000")
});