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
    /* tiempoEstimado: {
        type: Number,
        default: 60,
    }, */
    foto: {
        type: String,
        required: true,
    },
    activo: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model("servicio", servicioSchema);
