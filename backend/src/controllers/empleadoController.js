const logger = require("../config/logger");
const Servicio = require("../models/servicioModel");
const Empleado = require("../models/empleadoModel");
const { subirImagen, borrarImagen } = require("../helpers/cloudinaryHelper");

// @route GET /api/empleados?servicioId=
// @desc GET empleados de x servicio
// @access public
const getEmpleadosByServicio = async (req, res) => {
    try {
        const { servicioId } = req.query; //extraer id de la URL

        if (!servicioId) {
            return res.status(400).json({
                ok: false,
                msg: "El ID del servicio es requerido",
            });
        }

        const mongoose = require("mongoose");
        if (!mongoose.Types.ObjectId.isValid(servicioId)) {
            return res.status(400).json({
                ok: false,
                msg: "El ID del servicio no tiene un formato válido",
            });
        }

        const servicio = await Servicio.findOne({
            _id: servicioId,
            activo: true,
        });

        if (!servicio) {
            return res.status(404).json({
                ok: false,
                msg: "Servicio no encontrado",
            });
        }

        // buscar empleado
        const empleados = await Empleado.find({ servicios: servicioId }).select(
            "nombre foto",
        );

        res.status(200).json({
            ok: true,
            empleados,
        });
    } catch (error) {
        logger.error("Error al obtener empleados por servicio: ", error);
        res.status(500).json({
            ok: false,
            msg: "Error Interno",
        });
    }
};

// @route GET /api/empleados/admin
// @desc GET all empleados
// @access Admin only
const getAllEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.find(); // trae los empleados

        res.status(200).json({
            ok: true,
            empleados,
        });
    } catch (error) {
        logger.error("Error al obtener empleados: ", error);
        res.status(500).json({
            ok: false,
            msg: "Error Interno",
        });
    }
};

// @route GET /api/empleados/:id
// @desc GET one empleado
// @access Admin only
const getEmpleadoById = async (req, res) => {
    try {
        const { id } = req.params; //extraer id de la URL

        const empleado = await Empleado.findById(id); // trae el empleado por ID

        if (!empleado) {
            return res.status(404).json({
                ok: false,
                msg: "Empleado no encontrado",
            });
        }

        res.status(200).json({
            ok: true,
            empleado,
        });
    } catch (error) {
        logger.error("Error al obtener empleado: ", error);
        res.status(500).json({
            ok: false,
            msg: "Error Interno: Revisa que el ID sea válido",
        });
    }
};

// @route POST /api/empleados
// @desc POST new employee
// @access Admin only
const createEmpleado = async (req, res) => {
    try {
        const {
            servicios,
            horario,
            nombre,
            correo,
            fechaNacimiento,
            telefono,
            informacion,
        } = req.body || {};

        let fotoData = {};
        if (req.files && req.files.foto) {
            fotoData = await subirImagen(req.files.foto, "empleados");
        }

        const newEmpleado = new Empleado({
            nombre,
            correo,
            fechaNacimiento,
            telefono,
            informacion,
            foto: fotoData,
            servicios: servicios
                ? typeof servicios === "string"
                    ? JSON.parse(servicios)
                    : servicios
                : [],
            horario: horario
                ? typeof horario === "string"
                    ? JSON.parse(horario)
                    : horario
                : [],
        });

        await newEmpleado.save();

        res.status(201).json({
            ok: true,
            empleado: newEmpleado,
        });
    } catch (error) {
        logger.error("Error al crear empleado: ", error);
        res.status(500).json({
            ok: false,
            msg: "Error interno: " + error.message,
        });
    }
};

// @route PATCH /api/empleados/:id
// @desc PATCH existing employee
// @access Admin only
const updateEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const empleado = await Empleado.findById(id);

        if (!empleado) {
            return res.status(404).json({
                ok: false,
                msg: "Empleado no encontrado",
            });
        }

        const { servicios, horario, ...data } = req.body || {};

        Object.assign(empleado, data);

        // Foto
        if (req.files && req.files.foto) {
            if (empleado.foto && empleado.foto.public_id) {
                await borrarImagen(empleado.foto.public_id);
            }
            empleado.foto = await subirImagen(req.files.foto, "empleados");
        }

        // Actualizar servicios
        if (servicios !== undefined) {
            empleado.servicios =
                typeof servicios === "string"
                    ? JSON.parse(servicios)
                    : servicios;
        }

        // Actualizar horario
        if (horario !== undefined) {
            empleado.horario =
                typeof horario === "string" ? JSON.parse(horario) : horario;
        }

        const empleadoActualizado = await empleado.save();

        res.status(200).json({
            ok: true,
            msg: "Empleado actualizado correctamente",
            empleado: empleadoActualizado,
        });
    } catch (error) {
        logger.error("Error al actualizar empleado: ", error);
        res.status(500).json({
            ok: false,
            msg: "Error interno: " + error.message,
        });
    }
};

module.exports = {
    getEmpleadosByServicio,
    getAllEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
};
