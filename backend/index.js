const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const dotenv = require("dotenv");
const cors = require("cors");
const ExpressError = require("./utils/error");
const axios = require("axios");
dotenv.config();

const app = express();

const ENV = process.env.ENV;
let corsOptions = {
  origin: ENV != "production" ? "*" : `${process.env.CLIENT}`,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.text({ type: "text/plain" }));

// Passport config
require("./config/passport")(passport);
app.use(passport.initialize());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/bot", require("./routes/bot"));
app.use("/dashboard", require("./routes/dashboard"));

// Protected route

app.use((req, res, next) => {
  return next(new ExpressError(404, "Route not found"));
});

app.use((err, req, res, next) => {
  if (err) {
    const log_err = new ExpressError(
      err.status ? err.status : 500,
      err.display || "Internal Server Error"
    );

    console.log(log_err);

    return res.status(log_err.status).json({
      msg: log_err.display,
      redirectTo: "/",
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
