import { ActivityType } from "discord.js";
import ExtendedClient from "../";
import { connection } from "../db/mongodb";

export default {
	name: "ready",
	run: async (client: ExtendedClient) => {
		// Delete comentaries to connect to MongoDB
		// connection.then(() => client.logTerminal("success", "MongoDB Conectado\n-----------------------------------------"));
		client.logTerminal("success", `Logeado como: ${client.user?.username}`);
		client.user?.setActivity("Bot Template By Markox36", {
			type: ActivityType.Playing,
		});
	},
};
