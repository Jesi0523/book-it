/*
    nombres: string
    email: string
    sexo: string
    telefono: string
    fecha_nacimiento: date
*/

const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    sexo: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    fechaNacimiento: {
        type: Date,
        required: true,
    },
    rol: {
        type: String,
        enum: ["CLIENTE", "ADMIN"],
        default: "CLIENTE",
    },
});

module.exports = mongoose.model("usuario", usuarioSchema);
