import {
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ButtonBuilder,
	ButtonStyle,
	ChatInputCommandInteraction,
	ColorResolvable,
	EmbedBuilder,
} from "discord.js";
import ExtendedClient from "../../..";

export default {
	name: "example-command",
	description: "example-description",
	options: [
		{
			name: "message",
			type: ApplicationCommandOptionType.String,
			description: "Write a message",
			required: true,
		},
	],
	run: async (client: ExtendedClient, int: ChatInputCommandInteraction, args: string[]) => {
		int.reply({
			content: args[0],
			embeds: [
				new EmbedBuilder()
					.setTitle("Example Embed")
					.setDescription(`You wrote: ${args[0]}`)
					.setColor("Red" as ColorResolvable)
					.setTimestamp()
					.setFooter({ text: "Example Footer" })
					.setAuthor({ name: "Example Author" }),
			],
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder().setLabel("Example Button").setStyle(ButtonStyle.Primary).setCustomId("example-button"),
				),
			],
		});
	},
};
