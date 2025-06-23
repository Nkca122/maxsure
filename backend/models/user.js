const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  chat_id: {
    type: String,
    default: null,
  },
  telegram_username: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
