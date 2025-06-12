const bcrypt = require("bcryptjs");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapper");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const axios = require("axios");
require("dotenv").config();

// app.post("/new-message", async (req, res) => {
//   const { message } = req.body;
//   console.log("Received:", message);

//   if (
//     !message ||
//     !message.text ||
//     message.text.toLowerCase().indexOf("marco") < 0
//   ) {
//     return res.end();
//   }

//   try {
//     await axios.post(`${process.env.TELEGRAM_URL}/sendMessage`, {
//       chat_id: message.chat.id,
//       text: "Polo!!",
//     });
//     console.log("Replied with Polo!!");
//   } catch (err) {
//     console.error("Error sending message:", err.message);
//   }

//   res.end("ok");
// });

module.exports = [
  {
    method: "post",
    route: "/telegram_user",
    fn: wrapAsync(async (req, res) => {
      const { username } = req.body;
      await User.findByIdAndUpdate(req.user, {
        telegram_username: username,
      });
      res.status(200).json({
        msg: "Username updated",
      });
    }),

    middlewares: [authMiddleware],
  },

  {
    method: "post",
    route: "/new-message",
    fn: wrapAsync(async (req, res) => {
      const { message } = req.body;
      console.log(message);
      const existingPremiumUser = await User.findOne({
        telegram_username: message.chat.username,
      });

      if (existingPremiumUser) {
        await existingPremiumUser.updateOne({
          chat_id: message.chat.id,
        });

        try {
          await axios.post(`${process.env.TELEGRAM_URL}/sendMessage`, {
            chat_id: message.chat.id,
            text: "This is the bot and will send the reports here provide with the instruction set",
          });
        } catch (err) {
          console.error("Error sending message:", err.message);
        }
      } else {
        try {
          await axios.post(`${process.env.TELEGRAM_URL}/sendMessage`, {
            chat_id: message.chat.id,
            text: "You are not a premium user of this service. Give the link to register",
          });
        } catch (err) {
          console.error("Error sending message:", err.message);
        }
      }

      res.end("ok");
    }),
    middlewares: [],
  },
  {
    method: "post",
    route: "/webhook",
    fn: wrapAsync(async (req, res) => {
      console.log(req.body)
      res.end("ok")
    }),
    middlewares: [],
  },
];
