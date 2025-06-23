const bcrypt = require("bcryptjs");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapper");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = [
  {
    method: "post",
    route: "/signup",
    fn: wrapAsync(async (req, res) => {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(409).json({
          msg: "User already exists",
        });

      const hash = await bcrypt.hash(password, 10);
      const user = new User({
        email: email,
        password: hash,
      });

      await user.save();
      res.status(201).json({
        msg: "User created",
        redirectTo: "/",
      });
    }),

    middlewares: [],
  },

  {
    method: "post",
    route: "/login",
    fn: wrapAsync(async (req, res) => {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).json({
          msg: "Invalid credentials",
        });

      if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).json({
          msg: "Invalid credentials",
        });

      res.status(200).json({
        token: jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        ),
        redirectTo: "/dashboard",
      });
    }),
    middlewares: [],
  },
];
