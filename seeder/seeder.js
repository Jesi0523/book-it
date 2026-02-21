require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");

// modelos
const Usuario = require("../models/usuario");
const Servicio = require("../models/servicio");
const Empleado = require("../models/empleado");
const Empresa = require("../models/empresa");
const Suspension = require("../models/suspension");
const Cita = require("../models/cita");

// generadores
const generarUsuariosFalsos = require("../seeder/usuario");
const generarServiciosFalsos = require("../seeder/servicio");
const generarEmpleadosFalsos = require("../seeder/empleado");
const generarEmpresa = require("../seeder/empresa");
const generarSuspensionesFalsas = require("../seeder/suspension");
const generarCitasFalsas = require("../seeder/citas");

// seeding
const poblarBaseDeDatos = async () => {
    try {
        // conexion a la bd
        await connectDB();
        console.log("Iniciando el Seeding");

        // limpiar datos
        console.log("Borrando Datos");
        await Usuario.deleteMany();
        await Servicio.deleteMany();
        await Empleado.deleteMany();
        await Empresa.deleteMany();
        await Suspension.deleteMany();
        await Cita.deleteMany();

        // datos sin dependencias
        console.log("Generando Usuarios y Servicios");

        // 20 usuarios
        const usuariosData = generarUsuariosFalsos(20);
        const usuariosDB = await Usuario.insertMany(usuariosData);

        // servicios
        const serviciosData = generarServiciosFalsos();
        const serviciosDB = await Servicio.insertMany(serviciosData);

        console.log("Ingresando la Empresa");
        const empresaDB = generarEmpresa();
        await Empresa.insertMany(empresaDB);

        // colecciones dependientes
        console.log("Generando Empleados");
        const empleadosData = generarEmpleadosFalsos(5, serviciosDB, empresaDB);
        const empleadosDB = await Empleado.insertMany(empleadosData);

        // colecciones dependientes
        console.log("Generando Suspensiones");
        const suspensionesData = generarSuspensionesFalsas(empleadosDB);
        const suspensionesDB = await Suspension.insertMany(suspensionesData);

        console.log("Generando Citas");
        const citasData = generarCitasFalsas(
            usuariosDB,
            empleadosDB,
            serviciosDB,
            suspensionesDB,
            empresaDB,
        );
        await Cita.insertMany(citasData);

        console.log("SEEDING CORRECTO");
        process.exit(0);
    } catch (error) {
        console.error("ERROR AL POBLAR LA BASE DE DATOS:", error);
        process.exit(1);
    }
};

// Ejecutar el script
poblarBaseDeDatos();
