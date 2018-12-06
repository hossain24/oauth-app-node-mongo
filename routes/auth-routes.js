const router = require("express").Router();
const passport = require("passport");

// setting up login page
router.get("/login", (req, res) => {
    res.render("login", { user: req.user });
});

// setting up oauth with google
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}));

// setting up callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    // res.send(req.user);
    res.redirect("/profile");
});

// setting up logout page
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;