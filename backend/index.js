const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const dotenv = require("dotenv");
const cors = require("cors");
const ExpressError = require("./utils/error")
const axios = require("axios")
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.text({ type: 'text/plain' }));

// Passport config
require("./config/passport")(passport);
app.use(passport.initialize());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/bot", require("./routes/bot"))

// Protected route
const authenticateJwt = require("./middlewares/authMiddleware");
app.get("/protected", authenticateJwt, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});
app.use((req, res, next) => {
  return next(new ExpressError(404, "Route not found"));
});

app.use((err, req, res, next) => {
  if (err) {
    console.log(err)
    const log_err = new ExpressError(err.code ? err.code : 500, err.display || "Internal Server Error")
    console.log(log_err);
    return res.status(log_err.code).json({
      msg: log_err.display,
      redirectTo: "/"
    });
  }
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => {
    console.log(err);
    process.exit(-1);
  });
