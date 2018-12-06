const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");

const app = express();
// setting up view engine
app.set("view engine", "ejs");

// setting up auth routes
app.use("/auth", authRoutes);

// setting up home route
app.get("/", (req, res) => {
    res.render("home");
});

// setting up about route
app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, () => {
    console.log("the app is listening on port 3000")
});