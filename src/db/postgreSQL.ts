import { Pool, PoolClient } from "pg";
import ExtendedClient from "..";

export default class PostgreConnection {
	pool: Pool;
	bot: ExtendedClient;

	constructor(bot: ExtendedClient) {
		this.pool = new Pool({
			user: process.env.USER_DB,
			host: process.env.HOST_DB,
			database: process.env.NAME_DB,
			password: process.env.PASSWORD_DB,
			port: parseInt(process.env.PORT_DB as string),
		});
		this.bot = bot;
	}

	connect() {
		this.pool.connect((err: Error, client: PoolClient, done: ) => {
			if (err) throw err;
			else this.bot.logTerminal("success", "PostgreSQL Conectado");
		});

		return this.pool;
	}
}
