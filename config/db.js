const mongoose = require("mongoose");
const MongoClient = require("mongodb");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
	try {
		await mongoose.connect(db, { 
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		})
			.then(() => {console.log("MongoDB is connected...")});
	} catch(err) {
		console.log(err.message);
		process.exit(1)
	}
};

module.exports = connectDB;