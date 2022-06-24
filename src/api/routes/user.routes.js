const express = require("express");
const router = express.Router();

//Nos traemos las funciones.
const {
  getAllUsers,
  register,
  login,
} = require("../controllers/user.controllers");

//Cuando me meta en /users, que me ejecute la función getAllUsers
router.get("/", getAllUsers);
//Cuando me meta en /register, me ejecuta la función register
router.post("/register", register);
//Cuando me meta en /login, me ejecuta la función login
router.post("/login", login);

//Exportamos el router
module.exports = router;
