const suspensionSchema = new mongoose.Schema({
    empleadoId: {
        // si no tiene id, es para todos los empleados
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empleado",
        default: null,
    },
    fecha: {
        type: Date,
        required: true,
    },
    todoElDia: {
        type: Boolean,
        default: true,
    },
    horaInicio: {
        type: String,
        // Solo es obligatorio si "todoElDia" es falso
        required: function () {
            return this.todoElDia === false;
        },
    },
    horaFin: {
        type: String,
        // Solo es obligatorio si "todoElDia" es falso
        required: function () {
            return this.todoElDia === false;
        },
    },
});

module.exports = mongoose.model("suspension", suspensionSchema);
