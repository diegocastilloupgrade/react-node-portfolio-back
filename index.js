const express = require("express");
const cors = require("cors");
//NOS TRAEMOS DOTENV PARA ALMACENAR LAS VARIABLES DE ENTORNO DEL PUERTO
const dotenv = require("dotenv");
//CONFIGURO DOTENV.
dotenv.config();
const server = express();

const userRoutes = require("./src/api/routes/user.routes");
const workRoutes = require("./src/api/routes/work.routes");
const contactRoutes = require("./src/api/routes/contact.routes"); 

//ME IMPORTO LA FUNCION CONNECT Y LA EJECUTAMOS
const { connect } = require("./src/utils/database");
connect();

//SECRETKEY
server.set("secretKey", process.env.API_SECRET);

//CONFIGURAMOS LOS HEADERS PARA QUE SE PUEDAN HACER PETICIONES GET, PUT, PATCH, POST, DELETE
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//JSON
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//CORS - PERMISOS
// En el proyecto final la linea "origin" será para hacer que solo la página que nosotros le indiquemos entren en el server.
// origin: ["http://urldemisitio.com"]
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//USAMOS LOS ROUTES
server.use("/works", workRoutes);
server.use("/users", userRoutes);
server.use("/contact", contactRoutes);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});