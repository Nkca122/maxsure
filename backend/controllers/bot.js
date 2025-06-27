const User = require("../models/user");
const Report = require("../models/report");
const wrapAsync = require("../utils/wrapper");
const authMiddleware = require("../middlewares/authMiddleware");
const { default: axiosRetry } = require("axios-retry");
const axios = require("axios");
require("dotenv").config();

const TelegramAxiosClient = axios.create({
  baseURL: process.env.TELEGRAM_URL,
  timeout: 5000,
});

axiosRetry(TelegramAxiosClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.response?.status === 429
    );
  },
});

module.exports = [
  {
    method: "post",
    route: "/telegram_user",
    fn: wrapAsync(async (req, res) => {
      const { username } = req.body;
      await User.findByIdAndUpdate(req.user, {
        telegram_username: username,
      });
      return res.status(200).json({
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
      const existingPremiumUser = await User.findOne({
        telegram_username: message.chat.username,
      });

      if (existingPremiumUser) {
        await existingPremiumUser.updateOne({
          chat_id: message.chat.id,
        });

        try {
          await TelegramAxiosClient.post(`/sendMessage`, {
            chat_id: message.chat.id,
            text: `${process.env.PREMIUM_USER}`,
            parse_mode: "HTML",
          });
        } catch (err) {
          console.error("Error sending message:", err.message);
        }
      } else {
        try {
          await TelegramAxiosClient.post(`/sendMessage`, {
            chat_id: message.chat.id,
            text: `${process.env.REGISTER_USER}`,
            parse_mode: "HTML",
          });
        } catch (err) {
          console.error("Error sending message:", err.message);
        }
      }

      return res.end("ok");
    }),
    middlewares: [],
  },
  {
    method: "post",
    route: "/webhook",
    fn: wrapAsync(async (req, res) => {
      const response = await axios.post(
        `https://api.openai.com/v1/chat/completions`,
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `${process.env.ASSISTANT_PROMPT}`,
            },
            { role: "user", content: `${req.body}` },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.choices[0].message.content) {
        const new_report = new Report({
          content: response.data.choices[0].message.content,
        });

        await new_report.save();

        const Users = await User.find(
          { chat_id: { $nin: [null, ""] } },
          "chat_id"
        );

        Users.map(async (user) => {
          try {
            await TelegramAxiosClient.post(`/sendMessage`, {
              chat_id: user.chat_id,
              text: `${response.data.choices[0].message.content}`,
            });
          } catch (err) {
            console.error("Error sending message:", err.message);
          }
        });
      }
      return res.end("ok");
    }),
    middlewares: [],
  },
];
