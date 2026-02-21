/*
    nombre: string
    descripcion: string
    precio: number
    timpo_estimado: number
    foto: string        // SE GUARDARÍA EN CLOUDINARY, SE GUARDARÍA LA URL EN MONGO
*/

const mongoose = require("mongoose");
const servicioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    tiempoEstimado: {
        type: Number,
        required: true,
    },
    foto: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("servicio", servicioSchema);
