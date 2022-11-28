const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const endpointRetriever = require('./singleton/endpoints')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('beast')
    .setDescription('Displays Runescape beast information.')
    .addIntegerOption(option => option.setName('id')
    .setDescription('Beast identification number.')
    .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply()
        const beastData = await fetch(endpointRetriever.getBeastUrl(interaction.options.getInteger('id')))
        .then((response) => response.json())

        const beastEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${beastData.name}`)
        .setDescription(`${beastData.description}`) 
        .addFields(
            { name: 'Areas', value: `${beastData.areas.join("\n")}` },
            { name: 'Combat Level', value: `${beastData.level}`, inline: true },
            { name: 'Experience', value: `${beastData.level}`, inline: true },
            { name: 'Magic', value: `${beastData.magic}`, inline: true },
            { name: 'Defence', value: `${beastData.defence}`, inline: true },
            { name: 'Ranged', value: `${beastData.ranged}`, inline: true },
            { name: 'Attack', value: `${beastData.attack}`, inline: true }
        )
        .addFields(
            { name: 'Poisonous', value: `${beastData.poisonous}`, inline: true },
            { name: 'Weakness', value: `${beastData.weakness}`, inline: true },
            { name: 'Size', value: `${beastData.size}`, inline: true },
            { name: 'Members', value: `${beastData.members}`, inline: true },
            { name: 'Lifepoints', value: `${beastData.lifepoints}`, inline: true },
            { name: 'Aggressive', value: `${beastData.aggressive}`, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Developed by Sinan', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        await interaction.editReply({
            embeds: [beastEmbed]
        })
    }
}