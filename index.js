const Discord = require("discord.js")
const config = require("./config.json")
const { joinVoiceChannel } = require('@discordjs/voice')
const CatLoggr = require("cat-loggr")
const Logr = new CatLoggr()
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const logs = require('discord-logs');

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
    '32767'
  ]
});

logs(client);

module.exports = client

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  let confirm = await db.get(`antilink_${message.guild.id}`);
  if (confirm === false || confirm === null) {
    return;
  } else if (confirm === true) {
    if (message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return; // Caso o usuário tenha permissão de ADM, o bot vai permitir que o mesmo envie links
    if (message.content.toLocaleLowerCase().includes("http")) {
      message.delete()
      message.channel.send(`${message.author} Não envie links no servidor!`)
      .then(msg => {
          // Deleta a mensagem após 5 segundos (5000 milissegundos)
          setTimeout(() => {
              msg.delete();
          }, 5000); // 5000 milissegundos = 5 segundos
      })
      
    }

  }
});


client.on('interactionCreate', (interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

    cmd.run(client, interaction)

  }
})

// Função para adicionar cor ao console.log
function logWithColor(message, colorCode) {
  console.log(`\x1b[${colorCode}m${message}\x1b[0m`);
}


client.on("ready", (interaction) => {
  Logr.info(`|| Conectado com sucesso para a aplicação: ` + client.user.username)
  Logr.info('|| ID Encontrado com sucesso: ' + client.user.id);
});

// client.on("ready", () => {
//   let canal = client.channels.cache.get("") // coloque o ID do canal de voz
//   if (!canal) return console.log("❌ Não foi possível entrar no canal de voz.")
//   if (canal.type !== Discord.ChannelType.GuildVoice) return console.log(`❌ Não foi possível entrar no canal [ ${canal.name} ].`)

//   try {

//     joinVoiceChannel({
//       channelId: canal.id, // ID do canal de voz
//       guildId: canal.guild.id, // ID do servidor
//       adapterCreator: canal.guild.voiceAdapterCreator,
//     })
//     console.log(`✅ Entrei no canal de voz [ ${canal.name} ] com sucesso!`)

//   } catch(e) {
//     console.log(`❌ Não foi possível entrar no canal [ ${canal.name} ].`)
//   }

// });

client.on("interactionCreate", async interaction => {
  if (interaction.isButton()) {
    if (interaction.customId.startsWith("clear_dm")) {
      const dm = await interaction.user.createDM();
      interaction.reply({ content: `✅ *| ${interaction.user}, Limpando dm...*`, ephemeral: true })

      const deleteMessages = await client.channels.cache
        .get(dm.id)
        .messages.fetch({ limit: 99 });
      await deleteMessages.map((msg) => {
        if (msg.author.bot) {
          msg.delete();
        }
      });
    }
  }
})


// client.on("ready", () => {
//   const ListMessages = [
//     `❤  LEAGUE of HU3BR`, // Status 1
//     `❤  Amo Minha Mamãe @ay`, // Status 2
//   ];

//   let position = 0;
//   setInterval(() => client.user.setPresence({
//     activities: [{
//       name: `${ListMessages[position++ % ListMessages.length]}`,
//       type: Discord.ActivityType.Streaming,
//       url: 'https://www.twitch.tv/TwitchStatusServer'
//     }]
//   }), 1000 * 40);

//   client.user.setStatus("streaming");
// });



// 37 = Branco
// 36 = Ciano
// 34 = Azul
// 33 = Amarelo
// 32 = Verde
// 31 = Vermelho

client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token).then(() => {
  Logr.init('|| Token identificado, aplicação iniciada com sucesso!')
}).catch(err => {
  Logr.warn('|| Token não encontrato, por favor forneça um válido!' + err);
});

client.on("interactionCreate", require('./events/config-ticket').execute);
client.on("interactionCreate", require('./events/ticket').execute);
client.on("interactionCreate", require('./events/gerenciar').execute);


process.on('unhandRejection', (reason, promise) => {
  console.log(`🚨 | [Erro]\n\n` + reason, promise);
});
process.on('uncaughtException', (error, origin) => {
  console.log(`🚨 | [Erro]\n\n` + error, origin);
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚨 | [Erro]\n\n` + error, origin);
});