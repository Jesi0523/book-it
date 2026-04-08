const logger = require("../config/logger");
const Servicio = require("../models/servicioModel");
const Empleado = require("../models/empleadoModel");
const mongoose = require("mongoose");
const { matchedData } = require("express-validator");
const { subirImagen, borrarImagen } = require("../helpers/cloudinaryHelper");

// @route GET /api/empleados?servicioId=
// @desc GET empleados name and photo from X service
// @access public
const getEmpleadosByServicio = async (req, res) => {
    try {
        const { servicioId } = req.query; //extraer id de la URL

        // si no viene el id
        if (!req.query.servicioId) {
            return res.status(400).json({
                ok: false,
                msg: "El ID del servicio es requerido",
            });
        }

        // checar que sea un id valido
        if (!mongoose.Types.ObjectId.isValid(servicioId)) {
            return res.status(400).json({
                ok: false,
                msg: "El ID del servicio no tiene un formato válido",
            });
        }

        // buscar el servicio
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
// @desc GET details all empleados
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
// @desc GET details one empleado
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
        const data = matchedData(req, { locations: ["body"] });
        delete data.foto;

        // creaer empleado
        const newEmpleado = new Empleado(data);

        // subir la imagen a cloudinary
        if (req.files && req.files.foto) {
            newEmpleado.foto = await subirImagen(req.files.foto, "empleados");
        }

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

        const data = matchedData(req, { locations: ["body"] });
        delete data.foto;
        Object.assign(empleado, data);

        // Foto
        if (req.files && req.files.foto) {
            if (empleado.foto && empleado.foto.public_id) {
                await borrarImagen(empleado.foto.public_id);
            }
            empleado.foto = await subirImagen(req.files.foto, "empleados");
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
