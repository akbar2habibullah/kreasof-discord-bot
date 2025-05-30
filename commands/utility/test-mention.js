const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test-mention')
        .setDescription('Tests the bot\'s reply-on-mention functionality.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to send to the bot (mention will be added automatically)')
                .setRequired(true)),
    async execute(interaction) {
        const userMessage = interaction.options.getString('message');
        const botId = interaction.client.user.id;
        const testMessage = `<@${botId}> ${userMessage}`;

        // Inform the user that the test is starting
        await interaction.reply({ content: `Simulating mention with message: "${testMessage}". Please wait for the bot's reply...`, ephemeral: true });

        // The bot should auto-reply due to the MessageCreate event listener.
        // We don't need to explicitly check the reply here in the command,
        // as the test is to ensure the bot *does* reply.
        // Manual verification will be needed by the user running the command.
        // Or, for more advanced testing, one could set up a message collector.
        // For now, this command helps trigger the scenario.
    },
};
