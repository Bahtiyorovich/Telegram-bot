const TelegramBot = require('node-telegram-bot-api');

const {gameOptions, againOptions} = require('./options')
const token = '6978637080:AAG9jXgpEmKcXp7PzbNFn5M_qK47xT81Cc8'

const bot = new TelegramBot(token, {polling: true});

const obj = {}

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Men 0 dan 9 gacha bir son o'yladim, siz shu sonni topishga harakat qiling."
  );

  const randomNumber = Math.floor((Math.random() * 10))
  obj[chatId] = randomNumber;

  await bot.sendMessage(
    chatId, 
    "To'g'ri sonni toping", 
    gameOptions
  );
}

const botFunction = () => {
  bot.setMyCommands([
    {
      command: "/start", description: "Botni ishga tushirish"
    },
    {
      command: "/info", description: "Bot haqida ma'lumot"
    },
    {
      command: "/game", description: "Son topish o'yinini o'ynashni hohlaysizmi"
    }
  ])
  
  bot.on('message', async (msg) => {
    console.log(msg)
    const text = msg.text
    const chatId = msg.chat.id;
  
    if(text === '/start'){
      await bot.sendMessage(
      chatId, 
      'Bot sizga qanday yordam bera oladi !'
      );

    }
  
    if(text === '/info'){
       await bot.sendMessage(
        chatId, 
      `Salom ${msg.from.first_name} qalesiz og'ayni`
      );
      await bot.sendPhoto(
        chatId,
        'https://avatars.githubusercontent.com/u/92661003?v=4'
      )
    }

    if(text === '/game'){
      return startGame(chatId)
    }
  });

  bot.on('callback_query', async(msg) => {
    const data = msg.data
    const chatId = msg.message.chat.id

    if(data == '/again'){
      return startGame(chatId)
    }

    if(data == obj[chatId]){
      return bot.sendMessage(chatId, `Tabriklayman siz ${data} sonini tanlab to'g'ri javob berdingiz,`)
    }else {
      return bot.sendMessage(chatId, `Siz tanlagan son noto'g'ri,   boshqa son tanlang , men tanlagan son ${obj[chatId]} edi`,  againOptions); 
      
    }
    
  })
}

botFunction()