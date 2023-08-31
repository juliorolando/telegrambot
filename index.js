const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios').default;

const bot = new TelegramBot('TOKEN', { polling: true });

// TODO ESTE CODIGO FUNCIONA PERFECTO
// Escucha los mensajes para comprobar si alguien está escribiendo un mensaje con /ban
bot.on('message', (msg) => {
  console.log(`El usuario ${msg.from.first_name} envió: ${msg.text}`);
  if (msg.text === '/ban' && !msg.reply_to_message) {
    bot.sendMessage(msg.chat.id, 'Para banear al usuario, simplemente responde a su mensaje con /ban.');
  }
});
bot.onText(/\/ban/, (msg) => {
  const chatId = msg.chat.id;
  const sender_user_id_IsAdmin = msg.from.id;
  const userId = msg.reply_to_message.from.id;
  bot.getChatAdministrators(chatId).then((administrators) => {
    const reply_msg_isAdmin = administrators.some((admin) => admin.user.id === userId);
    const sender_ban_idsAdmin = administrators.some((admin) => admin.user.id === sender_user_id_IsAdmin);
    if (!reply_msg_isAdmin && sender_ban_idsAdmin) {
      bot.banChatMember(chatId, userId).then(() => {
        bot.sendMessage(chatId, `Usuario ${userId} ha sido baneado del grupo.`);
      }).catch((error) => {
        bot.sendMessage(chatId, `No pude banear al usuario ${userId}.`);
      });
    } else {
      bot.sendMessage(chatId, 'No tienes los permisos suficientes o estas intentando banear a un administrador.');
    }
  }).catch((error) => {
    bot.sendMessage(chatId, `Error! algo no funcionó correctamente.`);
  });
});


// Escucha los mensajes para comprobar si alguien está escribiendo un mensaje con /mute
bot.on('message', (msg) => {
  console.log(`El usuario ${msg.from.first_name} envió: ${msg.text}`);
  if (msg.text === '/mute' && !msg.reply_to_message) {
    bot.sendMessage(msg.chat.id, 'Para mutear al usuario, simplemente responde a su mensaje con /mute.');
  }
});
bot.onText(/\/mute/, (msg) => {
  const chatId = msg.chat.id;
  const sender_user_id_IsAdmin = msg.from.id;
  const userId = msg.reply_to_message.from.id;
  bot.getChatAdministrators(chatId).then((administrators) => {
    const reply_msg_isAdmin = administrators.some((admin) => admin.user.id === userId);
    const sender_ban_idsAdmin = administrators.some((admin) => admin.user.id === sender_user_id_IsAdmin);
    if (!reply_msg_isAdmin && sender_ban_idsAdmin) {
      bot.restrictChatMember(chatId, userId).then(() => {
        bot.sendMessage(chatId, `Usuario ${msg.chat.title} ha sido muteado.`);
      }).catch((error) => {
        bot.sendMessage(chatId, `No pude mutear al usuario ${msg.chat.title}.`);
      });
    } else {
      bot.sendMessage(chatId, 'No tienes los permisos suficientes o estas intentando mutear a un administrador.');
    }
  }).catch((error) => {
    bot.sendMessage(chatId, `Error! algo no funcionó correctamente.`);
  });
});

/*   bot.onText(/\/test/, (msg) => {
  axios.get('https://dolarapi.com/v1/dolares')
  .then(function (response) {
    // handle success
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `La cotización del dólar ${response.data[1].nombre} es de ${response.data[1].venta} para la venta.`);
    console.log(response.data[1]);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}); */

bot.onText(/\/test/, (msg) => {

});



