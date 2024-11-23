// const Discord = require('discord.js')

// module.exports = {
//     name: 'serverlist',
//     description: '[🥘 Owner] ServerList',
//     ownerOnly: true,
//     run: async (client, interaction, args) => {

//         client.guilds.cache.map(g => interaction.user.send({
//             embeds: [
//                 new Discord.EmbedBuilder()
//                     .setColor('Gold')
//                     .setDescription(`↪️ **| ServerName:** ${g.name} **ServerID:** ${g.id}`)
//                     .setThumbnail(g.iconURL({ format: 'png', dynamic: true }))
//             ],
//         }))
//         interaction.user.send({
//             components: [
//                 new Discord.ActionRowBuilder()
//                 .addComponents(
//                     new Discord.ButtonBuilder()
//                     .setCustomId('clear_dm')
//                     .setLabel('Clear DM')
//                     .setStyle(Discord.ButtonStyle.Danger)
//                 )
//             ],
//             embeds: [
//                 new Discord.EmbedBuilder()
//                     .setColor('Grey')
//                     .setDescription(`*Totalizando ${client.guilds.cache.size} servidores*`)
//             ],
//         })
//         interaction.reply({
//             content: `✅ | ${interaction.user}, *Verifique seu privado*`,
//             ephemeral: true,
//         })
//     }
// }