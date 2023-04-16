import { ColorResolvable, ApplicationCommandOptionType as CommandType, EmbedBuilder, Events, Interaction } from "discord.js";
import ExtendedClient from "..";
import { sleep } from "../utils/functions";

export default {
	name: Events.InteractionCreate,
	run: async (client: ExtendedClient, int: Interaction) => {
		const { colors } = client.config;

		if (int.isCommand()) {
			const command = client.slashCommands.get(int.commandName);
			const args: string[] = [];
			if (!command) return;
			for (const option of int.options.data) {
				if (option.type === CommandType.Subcommand) {
					if (option.name) args.push(option.name);
					option.options?.forEach((x) => {
						if (x.value) args.push(x.value as string);
					});
				} else if (option.value) args.push(option.value as string);
			}

			command.run(client, int, args);
		}

		if (int.isButton()) {
			// event handler for buttons
		}

		if (int.isModalSubmit()) {
			//  event handler for modal submit
		}
	},
};
