import mongoose from "mongoose";
const schema = new mongoose.Schema({
	guild_id: String,
	commands: Array,
});

export default mongoose.model("Example", schema);
