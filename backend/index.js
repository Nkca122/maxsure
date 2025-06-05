const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

// Passport config
require("./config/passport")(passport);
app.use(passport.initialize());

// Routes
app.use("/auth", require("./routes/auth"));

// Protected route
const authenticateJwt = require("./middlewares/authMiddleware");
app.get("/protected", authenticateJwt, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
}).catch((err)=>{
    console.log(err);
    process.exit(-1);
});
