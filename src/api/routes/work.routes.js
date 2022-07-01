const express = require("express");
const router = express.Router();
const { isAuth } = require("../../middleware/auth.middleware");
const {
  getAllWorks,
  getWorkByID,
  getWorkByName,
  createWork,
} = require("../controllers/work.controller");

router.get("/", getAllWorks);
router.get("/id/:id", getWorkByID);
router.get("/name/:nombre_proyecto", getWorkByName);
router.post("/addwork", [isAuth], createWork);

module.exports = router;
