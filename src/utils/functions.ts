import { REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import enviroments from "../enviroments";
import ExtendedClient from "../index";
import { RegisterCommands } from "../types/functionTypes";

export function registerApi(client: ExtendedClient) {
	new REST({ version: "10" })
		.setToken(enviroments.BOT_TOKEN as string)
		.put(Routes.applicationCommands(enviroments.BOT_ID as string), { body: client.slashCommands })
		.then(() => client.logTerminal("success", "Comandos de slash registrados correctamente."));
}

export async function registerCommands(client: ExtendedClient) {
	const fileCommands: RegisterCommands = { all: 0, included: [], excluded: [] };
	const promises = readdirSync(`${__dirname}/../commands/messageCommands/`).map(async (dir) => {
		const commands = readdirSync(`${__dirname}/../commands/messageCommands/${dir}/`).filter((file) => file.endsWith(".ts"));
		fileCommands.all += commands.length;
		for (const file of commands) {
			const pull = (await import(`${__dirname}/../commands/messageCommands/${dir}/${file}`)).default;
			if (pull.name) {
				fileCommands.included.push(pull.name);
				client.commands.set(pull.name, pull);
			} else {
				fileCommands.excluded.push(file.split(".")[0]);
			}
		}
	});
	await Promise.all(promises);

	client.logTerminal("success", `Módulo: commands: ${fileCommands.included.length} / ${fileCommands.all}`);
	if (fileCommands.included.length !== fileCommands.all) client.logTerminal("error", `Error en el archivo: ${fileCommands.excluded}.ts`);
}

export async function registerSlashCommands(client: ExtendedClient) {
	const fileCommands: RegisterCommands = { all: 0, included: [], excluded: [] };
	const promises = readdirSync(`${__dirname}/../commands/slashCommands/`).map(async (dir) => {
		const commands = readdirSync(`${__dirname}/../commands/slashCommands/${dir}/`).filter(
			(file: string) => file.endsWith(".ts") || file.endsWith(".js"),
		);
		fileCommands.all += commands.length;
		for (const file of commands) {
			const pull = (await import(`${__dirname}/../commands/slashCommands/${dir}/${file}`)).default;
			if (!pull.name) fileCommands.excluded.push(file.split("/").pop()?.split(".")[0] as string);
			client.slashCommands.set(pull.name, pull);
			fileCommands.included.push(pull.name);
		}
	});
	await Promise.all(promises);
	client.logTerminal("success", `Módulo: slashCommands: ${fileCommands.included.length} / ${fileCommands.all}`);
	if (fileCommands.included.length !== fileCommands.all) client.logTerminal("error", `Error en el archivo: ${fileCommands.excluded}.ts`);
}

export async function registerEvents(client: ExtendedClient) {
	const fileEvents: RegisterCommands = { all: 0, included: [], excluded: [] };

	const commands = readdirSync(`${__dirname}/../events`).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
	fileEvents.all = commands.length;
	for (const file of commands) {
		const pull = (await import(`${__dirname}/../events/${file}`)).default;
		if (!pull.name) fileEvents.excluded.push(file.split("/").pop()?.split(".")[0] as string);
		client.events.set(pull.name, pull);
		fileEvents.included.push(pull.name);
		if (pull?.rest) client.rest.on(pull.name, pull.run.bind(null, client));
		else client.on(pull.name, pull.run.bind(null, client));
	}

	client.logTerminal("success", `Módulo: eventos: ${fileEvents.included.length} / ${fileEvents.all}`);
	if (fileEvents.included.length !== fileEvents.all) client.logTerminal("error", `Error en ${fileEvents.excluded}`);
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
