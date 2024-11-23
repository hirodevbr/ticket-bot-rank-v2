const assumedFilePath = "json/assumidos.json";
const Discord = require("discord.js");
const fs = require('fs');

module.exports = {
  name: "deletar_rank",
  description: "Deletar Rank de tickets atendido",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
   

    
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {

    deleteAllAssumidos(interaction);
function deleteAllAssumidos(interaction) {
  try {
    // Deleta todos os assumidos
    fs.writeFileSync(assumedFilePath, "{}", "utf8");

    const embedDeleteAll = new Discord.EmbedBuilder()
      .setTitle("Assumidos Deletados")
      .setColor("#2ecc71") // Cor da embed (opcional)
      .setDescription("Todos os assumidos foram deletados com sucesso.");

    interaction.reply({ embeds: [embedDeleteAll], ephemeral: true });
  } catch (error) {
    console.error(`Erro ao deletar todos os assumidos: ${error.message}`);

    const embedError = new Discord.EmbedBuilder()
      .setTitle("Erro ao Deletar Assumidos")
      .setColor("#e74c3c") // Cor da embed (opcional)
      .setDescription("Ocorreu um erro ao deletar todos os assumidos.");

    interaction.reply({ embeds: [embedError] });
  }
}

}
  }
}