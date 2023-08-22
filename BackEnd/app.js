//Server importation
const express = require("express");

//Request controller
const cors = require("cors");

//Importing routes for request
const api = require("./routes/api");
const person = require("./routes/person");
//Start server with express
const app = express();

// IP/URL accepted
const whitelist = [
  "http://localhost:4200/"
];
//Request controller with the whiteList
const corsOptions = {
  origin: function (origin, callback) {
    console.log("Origen de la petición", origin);
    if (whitelist.indexOf(origin) === -1) {
      callback(new Error("Not allowed by CORS"), { origin: false });
    } else {
      callback(null, { origin: true });
    }
  },
  // credentials: true,
};

//remove corsOption
app.use(cors(corsOptions));

//Parse the incoming result with json payloads
app.use(express.json());

//(URL) Routes
app.use("/api", api);
//Personas
app.use("/person", person);

//Get port number from .env
const port = process.env.PORT_SERVER || 3000;

//Server running
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
  console.log(`Server URL for Devs http://localhost:${port}`);
});
