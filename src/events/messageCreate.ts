import { Events, Message, PermissionResolvable } from "discord.js";
import ExtendedClient from "../";

export default {
	name: Events.MessageCreate,
	rest: false,
	run: async (client: ExtendedClient, msg: Message) => {
		const { prefix } = client.config;

		if (msg.author.bot || !msg.content.startsWith(prefix)) return;

		const args = msg.content.slice(prefix.length).trim().split(/ +/g);
		const cmd = args.shift()?.toLowerCase();

		if (!cmd && !cmd?.length) return;

		const command = client.commands.get(cmd);

		if (command) {
			if (!command.active || !command.name) return;
			if (!command.clientPermissions.every((perm: PermissionResolvable) => msg.guild?.members.me?.permissions.has(perm))) {
				return msg.reply("No tengo los permisos necesarios para ejecutar este comando.");
			}
			if (!command.memberPermissions.every((perm: PermissionResolvable) => msg.member?.permissions.has(perm))) {
				return msg.reply("No tienes los permisos necesarios para ejecutar este comando.");
			}

			try {
				command.run(client, msg, args);
			} catch (err) {
				client.logTerminal("error", err);
				return msg.reply(`Algo salió mal mientras se ejecutaba: \`${command.name}\` comando.`);
			}
		}
	},
};
