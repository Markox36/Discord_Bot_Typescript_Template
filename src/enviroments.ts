import dotenv from "dotenv";

dotenv.config();

const { BOT_TOKEN, BOT_ID } = process.env;

interface Enviroments {
	BOT_TOKEN: string | undefined;
	BOT_ID: string | undefined;
}

const enviroments: Enviroments = {
	BOT_TOKEN,
	BOT_ID,
};

export default enviroments;
