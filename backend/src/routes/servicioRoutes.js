const express = require("express");
const router = express.Router();

const { validarCampos } = require("../middleware/validarCampos");
const { validarJWT } = require("../middleware/validarJWT");
const { validarAdmin } = require("../middleware/validarAdmin");

// Importar validador de campos
const { 
    createServicioValidator, 
    updateServicioValidator
} = require("../validators/servicioValidator");

// Importar controladores
const {
    getAllServicios,
    getOneServicio,
    createServicio,
    updateServicio,
    deleteServicio
} = require("../controllers/servicioController");


//////////////////RUTAS PÚBLICAS////////////////
router.get("/", getAllServicios);
router.get("/:id", getOneServicio);

//////////////////RUTAS SOLO ADMIN////////////////

router.post(
    "/", 
    [validarJWT, validarAdmin, createServicioValidator, validarCampos],
    createServicio
);

router.patch(
    "/:id", 
    [
        validarJWT, 
        validarAdmin,
        updateServicioValidator,
        validarCampos
    ],
    updateServicio
);

router.delete(
    "/:id", 
    [validarJWT, validarAdmin],
    deleteServicio
);


module.exports = router;
