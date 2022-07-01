const Message = require('../models/contact.model');
const HTTPSTATUSCODE = require('../../utils/httpStatusCode');

const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find();
    //Devolvemos en una respuesta
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      //Los datos que devolvemos son works: works
      data: { messages: messages },
    });
  } catch (error) {
    return next(error);
  }
};

const newMessage = async (req, res, next) => {
  try {
    const newMessage = new Message(req.body);
    const newMessageDB = await newMessage.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: { newMessage: newMessage },
    });
  } catch (error) {
    return next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteMessages = await Messages.findByIdAndDelete(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      comunidad: deleteComunidad,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAllMessages, newMessage, deleteMessage };
