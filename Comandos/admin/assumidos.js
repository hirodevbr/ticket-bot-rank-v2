const assumedFilePath = "json/assumidos.json";
const Discord = require("discord.js");
const fs = require('fs');

module.exports = {
  name: "rank",
  description: "rank de atendimento de tickets",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    interaction.reply({ content: `**${interaction.user.username}**, aguarde, vou enviar a embed com o rank dem assumidos...`, ephemeral: true })

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
      interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
  } else {

    function dataManager() {
      try {
        const data = fs.readFileSync(assumedFilePath, "utf8");
        return JSON.parse(data);
      } catch (err) {
        return {};
      }
    }

    function saveAssumedData(data) {
      fs.writeFileSync(assumedFilePath, JSON.stringify(data, null, 4), "utf8");
    }

    const configData = fs.readFileSync(assumedFilePath, "utf-8");
    const quantidadeAssumido = JSON.parse(configData);

    const sortedAssumidos = sortAssumidosByQuantity(quantidadeAssumido);

    const embed = new Discord.EmbedBuilder()
      .setTitle("Rank Atual")
      .setColor("#cc5e1c") // Cor da embed (opcional)
      .setImage("https://media.discordapp.net/attachments/1029491446992081029/1206718379646390311/la-ilusion-qiyana-lol-skin-splash-art-hd-wallpaper-uhdpaper.png?ex=65dd0711&is=65ca9211&hm=75d66b2292bd0b4072aee0c6ab9f9ec32575c183e57c51eb8452c876c83810c5&=&format=webp&quality=lossless&width=1202&height=676")
      .setDescription(await formatAssumidos(client, sortedAssumidos))
      .setFooter({text:"LEAGUE of Hu3BR ‧ Todos os direitos reservados.", iconURL:interaction.guild.iconURL()});

    interaction.channel.send({ embeds: [embed] });
  }
}};

function sortAssumidosByQuantity(assumidos) {
  // Converte o objeto assumidos em um array de [userId, quantidade] para facilitar a ordenação
  const assumidosArray = Object.entries(assumidos);

  // Ordena o array com base na quantidade de forma decrescente
  assumidosArray.sort((a, b) => b[1] - a[1]);

  // Converte o array ordenado de volta para um objeto
  const sortedAssumidos = Object.fromEntries(assumidosArray);

  return sortedAssumidos;
}

async function formatAssumidos(client, assumidos) {
  let formattedAssumidos = "";
  let count = 0;

  for (const userId in assumidos) {
    try {
      count++;
      const guild = await client.guilds.fetch('524951730534744076');
      const member = await guild.members.fetch(userId);

      const username = member ? member.displayName : "Usuário Desconhecido";

      formattedAssumidos += `${count} - **Nome:**  ${username}\n**ID:** ${userId}\n**Quantidade:** ${assumidos[userId]}\n\n`;
    } catch (error) {
      console.error(`Erro ao buscar membro ${userId}: ${error.message}`);
    }
  }

  return formattedAssumidos.trim() || "Nenhum assumido registrado.";
}