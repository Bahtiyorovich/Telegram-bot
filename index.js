const TelegramBot = require('node-telegram-bot-api');

const token = '6978637080:AAG9jXgpEmKcXp7PzbNFn5M_qK47xT81Cc8'

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const text = msg.text
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  if(text === '/start'){
    bot.sendMessage(chatId, `Salom ${msg.chat.first_name} qalesan og'ayni`);
  }

});
