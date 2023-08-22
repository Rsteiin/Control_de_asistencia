/* Importing the express module. */
const express = require('express')

/* Creating a new router object. */
const route = express.Router()
const apiController = require('../controllers/apiController')
/* A middleware that parse the request body. */
route.use(express.json())

route.get('/', (req, res) => {
    return res.status(200).json({
        response: 'ok'
    })
})

route.post ('/createToken',apiController.createToken);
/* This exports the route object so that it can be used in other files. */
module.exports = route