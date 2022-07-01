const express = require("express");
const router = express.Router();

//Nos traemos las funciones.
const {
  getAllMessages,
  newMessage,
  deleteMessage,
} = require("../controllers/contact.controllers");

router.get("/", getAllMessages);
router.post("/newmessage", newMessage);
router.post("/delete",deleteMessage);

//Exportamos el router
module.exports = router;
