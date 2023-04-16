import { AttachmentBuilder, Events, GuildMember, TextChannel } from "discord.js";
import ExtendedClient from "..";

export default {
	name: Events.GuildMemberAdd,
	run: async (client: ExtendedClient, member: GuildMember) => {
		// Event for when a member joins the server
	},
};
