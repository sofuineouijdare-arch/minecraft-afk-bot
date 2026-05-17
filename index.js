const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: process.env.MC_SERVER_HOST,
  port: parseInt(process.env.MC_SERVER_PORT || '25565'),
  username: process.env.MC_BOT_USERNAME || 'AFKBot',
  version: process.env.MC_SERVER_VERSION || '1.20.4'
});

bot.on('spawn', () => {
  console.log('AFKBot spawned!');
  setInterval(() => {
    if (bot.entity) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }
  }, 5000);
});

bot.on('kicked', (reason) => {
  console.log(`Kicked: ${reason}`);
  setTimeout(() => process.exit(1), 10000);
});

bot.on('error', err => console.error(err));
