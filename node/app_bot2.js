const { Telegraf } = require('telegraf')
const bot = new Telegraf("1754769899:AAEKUICJAdn8YDPwhqIeICwcFmDWwBFzwH4")

bot.command('quit', (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  ctx.leaveChat()
})


bot.command('start', (ctx) => {
  // Explicit usage
  //ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)

  // Using context shortcut
   ctx.replyWithPhoto({ source: 'yoniRobot1.jpg' })
})



bot.on('hello', (ctx) => {
  // Explicit usage
  //ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)

  // Using context shortcut
  ctx.reply(`Hello to you 2`)
})

bot.on('text', (ctx) => {
  // Explicit usage
  //ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)

  // Using context shortcut
  let msg_txt;
  try{
  msg_txt = ctx.message.text;
  }
	catch (e)  {msg_txt='empty'; }
  let out_msg;
  switch (msg_txt.toLocaleLowerCase()){
	  case 'tell me a story':
		  out_msg=alice_story;
		  break;
	  case 'build icon bitte page':
                  postData(ele_server, { text: msg_txt}).then(data => {
                  out_msg=data;
                  console.log(data); // JSON data parsed by `data.json()` call
  });
		  break;
	  case 'blabla':
		  out_msg='????';
		  break;
          default:
		  out_msg="מאמי אני על זה";
		  break;
 /*                 console.log(msg_txt);
		  if (msg_txt===null) msg_txt="add page";
		  postData(ele_server, { text: msg_txt}).then(data => {
		  out_msg=data;
    console.log(data); // JSON data parsed by `data.json()` call
  });
*/

  }
  ctx.reply(out_msg)
})

bot.on('callback_query', (ctx) => {
  // Explicit usage
  ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

  // Using context shortcut
  ctx.answerCbQuery()
})

bot.on('inline_query', (ctx) => {
  const result = []
  // Explicit usage
  ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

  // Using context shortcut
  ctx.answerInlineQuery(result)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
const alice_story = 'Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?”....'
const fetch = require("node-fetch");

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData('http://ec2-3-65-182-5.eu-central-1.compute.amazonaws.com:53000/command', { text: "make page" })
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
const ele_server='http://ec2-3-65-182-5.eu-central-1.compute.amazonaws.com:53000/command';

