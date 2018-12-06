const router = require("express").Router();
const passport = require("passport");

// setting up login page
router.get("/login", (req, res) => {
    res.render("login");
});

// setting up oauth with google
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}));

// setting up callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.send("You have reached the redirect page");
});

// setting up logout page
router.get("/logout", (req, res) => {
    res.send("Logging out");
});

module.exports = router;