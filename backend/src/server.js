const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const logTransacciones = require("./middleware/logMiddleware");
const cors = require("cors");
const path = require("path");
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger global
const logger = require("./config/logger");
global.logger = logger;

// Middlewares globales
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173", // debe de ser el puerto de React
        credentials: true, // Permite que las cookies pasen
    }),
);

// middleware de logs
app.use(logTransacciones);

// Rutas
const usuarioRoutes = require("./routes/authRoutes");
const servicioRoutes = require("./routes/servicioRoutes");
const empresaRoutes = require("./routes/empresaRoutes");
const empleadoRoutes = require("./routes/empleadoRoutes");
const suspensionRoutes = require("./routes/suspensionRoutes");
const citasRoutes = require("./routes/citaRoutes");
const reporteRoutes = require("./routes/reporteRoutes");

// importar rutas
app.use("/api/auth", usuarioRoutes);
app.use("/api/servicios", servicioRoutes);
app.use("/api/empresa", empresaRoutes);
app.use("/api/empleados", empleadoRoutes);
app.use("/api/suspensiones", suspensionRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/reportes", reporteRoutes);

// PARA SERVIR REACT Y BACK EN PRODUCCIÓN JUNTOS
if (process.env.NODE_ENV === "production") {
    // archivos de React
    app.use(express.static(path.join(__dirname, "../dist")));
    app.get(/(.*)/, (req, res) => {
        if (!req.url.startsWith("/api")) {
            res.sendFile(path.join(__dirname, "../dist", "index.html"));
        }
    });
} else {
    logger.info("Modo desarrollo: React se sirve desde Vite.");
}

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

module.exports = app; // exportar para testing
