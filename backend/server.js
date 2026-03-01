const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

// importar rutas
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 5000;

// Conectar la base de datos
connectDB()
    .then(() => {
        // solo si se conectó la base de datos arrancamos el servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("El servidor no falló. Checar conexión con la BD:", err);
    });
