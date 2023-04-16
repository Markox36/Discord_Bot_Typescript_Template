import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import botConfig from "./config/config";
import Models from "./db/models";
import enviroments from "./enviroments";
import type { CommandData, EventData, SlashCommandData } from "./types";
import { registerApi, registerCommands, registerEvents, registerSlashCommands } from "./utils/functions";

export default class ExtendedClient extends Client {
	commands: Collection<string, CommandData> = new Collection();
	slashCommands: Collection<string, SlashCommandData> = new Collection();
	events: Collection<string, EventData> = new Collection();
	config = botConfig;
	db = Models;

	constructor() {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildBans,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildMessageTyping,
				GatewayIntentBits.GuildMessageReactions,
				GatewayIntentBits.GuildPresences,
				GatewayIntentBits.GuildIntegrations,
				GatewayIntentBits.GuildWebhooks,
				GatewayIntentBits.GuildVoiceStates,
				GatewayIntentBits.GuildInvites,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.DirectMessageReactions,
				GatewayIntentBits.MessageContent,
			],
			partials: [Partials.User, Partials.Message, Partials.Channel, Partials.GuildMember],
		});
	}

	async run(): Promise<void> {
		if (!enviroments.BOT_TOKEN) this.logTerminal("error", "No se ha podido logear con el bot o no se ha encontrado el token.");
		await this.login(enviroments.BOT_TOKEN);
		await registerCommands(this);
		await registerSlashCommands(this);
		await registerEvents(this);
		await registerApi(this);
	}

	public logTerminal(type: string, error: unknown): void {
		if (type === "success") console.log("🟢 [SUCCESS] =>", error);
		if (type === "warning") console.log("🟠 [WARNING] =>", error);
		if (type === "error") console.log("🔴 [ERROR] =>", error);
	}
}

const client = new ExtendedClient();
client.run();

process.on("uncaughtException", async (error: Error) => client.logTerminal("error", error));
process.on("unhandledRejection", async (error: Error) => client.logTerminal("error", error));
