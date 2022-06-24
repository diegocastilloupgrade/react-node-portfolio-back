const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const MONGO_DB = process.env.MONGO_DB;

const connect = async () => {
  try {
    const DB = await mongoose.connect(MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //CON DESTRUCTURING SACO DE MI DB.CONNECTION MI NAME Y HOST PARA PODER USARLOS PARA IMPIRMIR POR CONSOLA.
    const { name, host } = DB.connection;
    console.log(`Connected to DB: ${name}, in host: ${host}`);
  } catch (error) {
    console.error("Error connecting to DB");
  }
};

module.exports = { connect };