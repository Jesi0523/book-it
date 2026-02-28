const express = require("express");
const connectDB = require("./config/db");
const app = express();

const PORT = process.env.PORT || 5000;

// Conectar la base de datos
connectDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
