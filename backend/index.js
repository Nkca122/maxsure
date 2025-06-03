const TelegramBot = require("node-telegram-bot-api");

// Replace with your actual bot token
const token = "8174297917:AAGYJi7sid1Y_c3bVqWaCF8yCemf40fWwkw";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  if (msg.text && msg.text.toLowerCase().includes("marco")) {
    bot.sendMessage(chatId, "Polo!!");
  }
});

console.log("Bot is running using polling...");
