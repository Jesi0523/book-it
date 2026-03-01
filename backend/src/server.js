const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./config/logger");
const logTransacciones = require("./middleware/logMiddleware");

// importar rutas
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();

// middleware general
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // para poder parsear bodies con formato x-www-form-urlencoded

// middleware de logs
app.use(logTransacciones);

// Rutas
app.use("/api/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 5001;

// Conectar la base de datos
connectDB()
    .then(() => {
        // solo si se conectó la base de datos arrancamos el servidor
        app.listen(PORT, () => {
            logger.info(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch((err) => {
        logger.error("El servidor falló. Checar conexión con la BD:", err);
    });
