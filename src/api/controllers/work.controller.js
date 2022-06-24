
const Work = require('../models/work.model');
const HTTPSTATUSCODE = require('../../utils/httpStatusCode');

//Función de traerme todos los trabajos
const getAllWorks = async (req, res, next) => {
  try {
    //Buscamos todos los alumnos
    const works = await Work.find();
    //Devolvemos en una respuesta
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      //Los datos que devolvemos son works: works
      data: { works: works },
    });
  } catch (error) {
    return next(error);
  }
};

const getWorkByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const workByID = await Work.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: workByID,
    });
  } catch (error) {
    return next(error);
  }
};

const getWorkByName = async (req, res, next) => {
  try {
    const nombre_proyecto = req.params.nombre_proyecto;
    const workByName = await Work.findOne({ nombre_proyecto: nombre_proyecto });
    console.log("workByName",workByName);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: workByName,
    });
  } catch (error) {
    return next(error);
  }
};

const createWork = async (req, res, next) => {
  try {
    const newWork = new Work(req.body);
    const newWorkDB = await newWork.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      //Los datos que devolvemos son newWork: newWork
      data: { newWork: newWork },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAllWorks, getWorkByID, getWorkByName, createWork };
