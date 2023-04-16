import { RESTRateLimit } from "discord.js";
import ExtendedClient from "..";

export default {
	name: "rateLimited",
	rest: true,
	run: async (client: ExtendedClient, request: RESTRateLimit) => {
		client.logTerminal("success", "Escuchando ratelimits!");
		client.logTerminal("error", request);
	},
};
