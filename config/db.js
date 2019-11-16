const mongoose = require("mongoose");
const MongoClient = require("mongodb");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
	try {
		await MongoClient.connect(db, { useUnifiedTopology: true });
		chalk.yellow("MongoDB is connected...")
	} catch(err) {
		console.log(err.message);
		process.exit(1)
	}
};

module.exports = connectDB;