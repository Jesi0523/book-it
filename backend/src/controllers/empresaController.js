const logger = require("../config/logger");
const Empresa = require("../models/empresaModel");
const { subirImagen, borrarImagen } = require("../helpers/cloudinaryHelper");

// @route GET api/empresa
// @desc Get info empresa
// @access Admin Only
const getEmpresa = async (req, res) => {
    try {
        const empresa = await Empresa.findOne(); // se supone que solo hay una empresa

        if (!empresa) {
            return res.status(404).json({
                ok: false,
                msg: "Empresa no encontrada",
            });
        }

        res.status(200).json({
            ok: true,
            empresa,
        });
    } catch (error) {
        logger.error("Error al obtener información de la empresa: ", error);
        res.status(500).json({
            ok: false,
            msg: "Error interno",
        });
    }
};

// @route PATCH api/empresa
// @desc PATCH info empresa
// @access Admin Only
const updateEmpresa = async (req, res) => {
    try {
        // buscar empresa
        const empresa = await Empresa.findOne();

        if (!empresa) {
            return res.status(404).json({
                ok: false,
                msg: "Empresa no encontrada",
            });
        }

        // separar campos del body, se separan los arreglos y objetos para parsearlos
        const { galeria, logo, horarioGlobal, ...data } = req.body || {};

        Object.assign(empresa, data); // actualizar campos simples de texto

        // convierte el texto del horario global a un objeto
        if (horarioGlobal) {
            empresa.horarioGlobal =
                typeof horarioGlobal === "string"
                    ? JSON.parse(horarioGlobal)
                    : horarioGlobal;
        }

        // Logo, se reemplaza pq es un archivo unico
        if (req.files && req.files.logo) {
            if (empresa.logo && empresa.logo.public_id) {
                await borrarImagen(empresa.logo.public_id);
            }
            const nuevoLogo = await subirImagen(req.files.logo, "empresa");
            empresa.logo = nuevoLogo;
        }

        // Galeria

        // convierte la galeria que se conserva de string a arreglo
        let galeriaConservada = [];
        if (galeria) {
            galeriaConservada =
                typeof galeria === "string" ? JSON.parse(galeria) : galeria;
        }
        const idsConservados = galeriaConservada.map((img) => img.public_id); // extraer los public_id de las fotos que se conservaran

        // encontrar en cloudinary las fotos que se borraran
        const imagenesParaBorrar = empresa.galeria.filter(
            (img) => !idsConservados.includes(img.public_id),
        );

        for (const img of imagenesParaBorrar) {
            if (img.public_id) await borrarImagen(img.public_id);
        }

        // crear el nuevo arreglo de galeria con las fotos conservadas
        let galeriaFinal = [...galeriaConservada];

        // subir las nuevas fotos de galería
        if (req.files && req.files.nuevasFotosGaleria) {
            const fotosNuevas = Array.isArray(req.files.nuevasFotosGaleria) // si es un solo archivo lo convierte a un arreglo
                ? req.files.nuevasFotosGaleria
                : [req.files.nuevasFotosGaleria];

            // sube cada foto nueva y la agrega al arreglo final
            for (const foto of fotosNuevas) {
                const fotoSubida = await subirImagen(foto, "empresa_galeria");
                galeriaFinal.push(fotoSubida);
            }
        }

        // actualizar el arreglo de la base de datos
        empresa.galeria = galeriaFinal;

        const empresaActualizada = await empresa.save();

        res.status(200).json({
            ok: true,
            msg: "Información y galería actualizadas correctamente",
            empresa: empresaActualizada,
        });
    } catch (error) {
        logger.error(
            "Error al actualizar la información de la empresa: ",
            error,
        );
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

module.exports = {
    getEmpresa,
    updateEmpresa,
};
