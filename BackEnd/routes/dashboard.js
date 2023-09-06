/* Importing the express module. */
const express = require('express')

/* Creating a new router object. */
const route = express.Router()
const auth = require("../middleware/authToken");
const dashboardController = require('../controllers/dashboardController')
/* A middleware that parse the request body. */
route.use(express.json())

route.post ('/getGraficaTurno',auth,dashboardController.getGraficaTurno);
/* This exports the route object so that it can be used in other files. */
module.exports = route