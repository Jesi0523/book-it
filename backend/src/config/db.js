const mongoose = require("mongoose");

const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        console.log("Intentando conectar a Atlas...");
        await mongoose.connect(db);
        console.log("-- MongoDB conectado --");
    } catch (err) {
        console.error("-- ERROR CONECTANDO MONGO --", err.message);

        // exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
