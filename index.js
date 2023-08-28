// Importamos la librería node-telegram-bot-api 
const TelegramBot = require('node-telegram-bot-api');

// Creamos una constante que guarda el Token de nuestro Bot de Telegram que previamente hemos creado desde el bot @BotFather
// Create a new bot instance
const bot = new TelegramBot('TOKEN', {polling: true});

// TODO ESTE CODIGO FUNCIONA PERFECTO, CREO QUE ES LA BASE DE MI BOT OH YEA

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
      bot.sendMessage(chatId, `${error} Error al obtener información de los administradores.`);
    });
  });
  
  // Escucha los mensajes para comprobar si alguien está escribiendo un mensaje con /ban
  bot.on('message', (msg) => {
    if (msg.text === '/ban' && !msg.reply_to_message) {
      bot.sendMessage(msg.chat.id, 'Para banear al usuario, simplemente responde a su mensaje con /ban.');
    }
  });