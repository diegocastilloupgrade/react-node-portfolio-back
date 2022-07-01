const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  alias: { type: String, trim: true, required: true },
});

//Userschema ants de guardar hace una funcion que antes de guardar la contraseña la encripte.
UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

//FUNCION QUE EXPORTA EL USUARIO CON UN MODELO DE MONGO DE LA COLECCION USUARIOS Y TOD LO QUE HAY EN EL USERSCHEMA
const User = mongoose.model("users", UserSchema);
//PARA PODER USAR EL USUARIO FUERA LO EXPORTAMOS
module.exports = User;
