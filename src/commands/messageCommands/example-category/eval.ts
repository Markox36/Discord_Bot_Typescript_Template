import { Type } from "@anishshobith/deeptype";
import { Message } from "discord.js";
import { inspect } from "util";
import ExtendedClient from "../../..";

export default {
	name: "eval",
	category: "dev",
	active: true,
	memberPermissions: ["SendMessages"],
	clientPermissions: ["SendMessages", "EmbedLinks"],
	run: async (client: ExtendedClient, msg: Message, args: string[]) => {
		if (!client.config.devs.includes(msg.author.id)) return msg.reply("No tienes permisos para ejecutar este comando.");
		if (!args.length) return msg.channel.send("Pon algo para evaluar.");
		let code = args.join(" ");
		const words = [
			"client.destroy()",
			"client.destroy",
			"client.token",
			"process.env",
			"process.env.TOKEN",
			"token",
			"process.env.MONGO_ACCOUNT",
			"MONGO_ACCOUNT",
			"mongoose",
		];
		for (const word of words) {
			if (msg.content.includes(word)) return msg.channel.send("😂😂🤣🤣🤣 **Vaya parece que se te ha caído la gracia jajaja**");
		}
		code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
		let evaled;
		try {
			const start = process.hrtime();
			evaled = await eval(code);
			if (evaled instanceof Promise) {
				evaled = await evaled;
			}
			const stop = process.hrtime(start);
			const response = [
				`**🧬 Tipo:** \`\`\`ts\n${new Type(evaled).is}\`\`\``,
				`**⏳ Tiempo:** \`\`\`${(stop[0] * stop[1]) / 1e6}ms\`\`\``,
				`**💾 Código:** \`\`\`js\n${await clean(inspect(await evaled, { depth: 0 }))}\`\`\``,
			];
			const res = response.join("\n");
			await sendMsg(msg, res);
		} catch (err) {
			console.log(err);
			return msg.channel.send(`**Error:** \`\`\`xl\n${await clean(err as string)}\n\`\`\``);
		}
		async function clean(text: string) {
			if (typeof text === "string") {
				text = text
					.replace(/`/g, `\`${String.fromCharCode(8203)}`)
					.replace(/@/g, `\`${String.fromCharCode(8203)}`)
					.replace(new RegExp(client.token as string, "gi"), "****");
			}
			return text;
		}
		async function sendMsg(msg: Message, res: string) {
			try {
				if (res.length < 2000) {
					await msg.channel.send(res);
				} else {
					await msg.channel.send({ files: [{ attachment: Buffer.from(res), name: `${msg.author?.id}-eval.yaml` }] });
				}
			} catch (error) {
				if (res.length < 2000) {
					await msg.author.send(res);
				} else {
					await msg.author.send({ files: [{ attachment: Buffer.from(res), name: `${msg.author?.id}-eval.yaml` }] });
				}
			}
		}
	},
};
