const bcrypt = require("bcryptjs");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapper");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = [
  {
    method: "post",
    route: "/api/signup",
    fn: wrapAsync(async (req, res) => {
      const { email, password } = req.body;
      const hash = await bcrypt.hash(password, 10);

      const user = new User({
        email: email,
        password: hash,
      });

      await user.save();
      res.json({});
    }),
    middlewares: [],
  },

  {
    method: "post",
    route: "/api/login",
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

      res.json({
        token: jwt.sign(
          {
            sub: user._id,
          }, process.env.JWT_SECRET,{ expiresIn: "1d"}
        ),
      });
    }),
    middlewares: [],
  },
];
