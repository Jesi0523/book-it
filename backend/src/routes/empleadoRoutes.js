const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

const { validarCampos } = require("../middleware/validarCampos");
const { validarJWT } = require("../middleware/validarJWT");
const { validarAdmin } = require("../middleware/validarAdmin");

// validadores

const {
    createEmpleadoValidator,
    updateEmpleadoValidator,
} = require("../validators/empleadoValidator");

router.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
    }),
);

const {
    getEmpleadosByServicio,
    getAllEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
} = require("../controllers/empleadoController");

// recuperar datos de empleados
router.get("/", [getEmpleadosByServicio]);
router.get("/admin", [validarJWT, validarAdmin, getAllEmpleados]);
router.get("/admin/:id", [validarJWT, validarAdmin, getEmpleadoById]);

// crear empleado
router.post("/", [
    validarJWT,
    validarAdmin,
    createEmpleadoValidator,
    validarCampos,
    createEmpleado,
]);

// actualizar empleado
router.patch("/admin/:id", [
    validarJWT,
    validarAdmin,
    updateEmpleadoValidator,
    validarCampos,
    updateEmpleado,
]);

module.exports = router;
