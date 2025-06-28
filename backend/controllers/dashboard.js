const User = require("../models/user");
const Report = require("../models/report");
const wrapAsync = require("../utils/wrapper");
const authMiddleware = require("../middlewares/authMiddleware");
const { default: axiosRetry } = require("axios-retry");
const axios = require("axios");
require("dotenv").config();

module.exports = [
  {
    method: "post",
    route: "/reports",
    fn: wrapAsync(async (req, res) => {
      const page = req.query.p || 0;
      const limit = parseInt(process.env.REPORTS_PER_PAGE);

      const reports = await Report.find()
        .sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(limit);

      const count = await Report.countDocuments();
      res.status(200).json({
        reports: reports,
        totalPages: Math.ceil(count / parseInt(process.env.REPORTS_PER_PAGE)),
      });
    }),
    middlewares: [authMiddleware],
  },
  {
    method: "post",
    route: "/user",
    fn: wrapAsync(async (req, res) => {
      const user = await User.findById(req.user);
      return res.status(200).json({
        username: user.telegram_username,
      });
    }),
    middlewares: [authMiddleware],
  },
];
