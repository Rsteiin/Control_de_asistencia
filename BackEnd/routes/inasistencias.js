/* Importing the express module. */
const express = require('express')

/* Creating a new router object. */
const route = express.Router();
const auth = require("../middleware/authToken");
const inasistenciasController = require('../controllers/inasistenciasController');
/* A middleware that parse the request body. */
route.use(express.json())

route.post('/guardarInasistencias', auth, inasistenciasController.guardarInasistencias);
route.post('/getInasistenciasPorInstitucion',auth, inasistenciasController.getInasistenciasPorInstitucion)
/* This exports the route object so that it can be used in other files. */
module.exports = route