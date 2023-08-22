/* Importing the express module. */
const express = require("express");

/* Middleware for the authentication */
const auth = require("../middleware/authToken");

/* Creating a new router object. */
const route = express.Router();
const personController = require("../controllers/personController");

/* A middleware that parse the request body. */
route.use(express.json());

route.post("/getPersonQueue", auth, personController.getPersonQueue);
route.post(
  "/getPersonMailEventsAutomation",
  auth,
  personController.getPersonMailEventsAutomation
);
route.post("/getPersonCategories", auth, personController.getPersonCategories);
route.post("/getPersonByCategory", auth, personController.getPersonByCategory);
route.post("/getPersonBySchedule", auth, personController.getPersonBySchedule);
route.post(
  "/getPersonTraitsMessages",
  auth,
  personController.getPersonTraitsMessages
);
route.post(
  "/getPersonAdditionalInfo",
  auth,
  personController.getPersonAdditionalInfo
);
/* This exports the route object so that it can be used in other files. */
module.exports = route;
