import {
	ApplicationCommandOptionType,
	CommandInteraction,
	Message,
	PermissionResolvable,
} from "discord.js";
import ExtendedClient from "..";

export type SlashCommandData = {
	name: string;
	description: string;
	options?: CommandOption[];
	run: (
		client: ExtendedClient,
		int: CommandInteraction,
		args: string[],
	) => Promise<void>;
};

export interface CommandOption {
	name: string;
	description: string;
	type: ApplicationCommandOptionType;
	required?: boolean;
	choices?: CommandOptionChoice[];
	options?: CommandOption[];
}

export interface CommandOptionChoice {
	name: string;
	value: string | number;
}

export interface CommandData {
	name: string;
	category: string;
	active: boolean;
	memberPermissions: PermissionResolvable[];
	clientPermissions: PermissionResolvable[];
	run: (client: ExtendedClient, msg: Message, args: string[]) => Promise<void>;
}

export interface EventData {
	name: string;
	run: (client: ExtendedClient, ...args: any[]) => Promise<void>;
}
