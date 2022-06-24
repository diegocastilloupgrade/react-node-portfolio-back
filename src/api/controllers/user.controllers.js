//NOS TRAEMOS EL USUARIO QUE VIENE DEL MODELO.
const User = require("../models/user.model");

//NOS TRAEMOS JWT PARA GESTIONAR LOS TOKENS
const jwt = require("jsonwebtoken");
//NOS TRAEMOS BCRYPT PARA COMPARAR LA CONTRASEÑA QUE META EL USER CON LO QUE HAY EN LA BBDD
const bcrypt = require("bcrypt");
const HTTPSTATUSCODE = require("../../utils/httpstatuscode");

//CREAMOS LA FUNCION REGISTER PARA REGISTRAR AL USUARIO.
const register = async (req, res, next) => {
  try {
    //GENERAMOS UN NUEVO USUARIO newUser que es de tipo User y le metemos el req.body entero
    const newUser = new User(req.body);
    //ALMACENAMOS EL USUARIO EN BBDD
    const newUserDB = await newUser.save();
    //RETORNAMOS UNA RESPUESTA 201 SI HA IDO BIEN O EL ERROR
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};

//FUNCION LOGIN.
const login = async (req, res, next) => {
  try {
    //ENCUENTRA EL USUARIO EN LA BBDD
    //NOS TRAEMOS EL userInfo, lo metemos en el modelo (User) y encontramos solo 1 findOne
    //Comparamos el email que le paso por el req.body.email
    const userInfo = await User.findOne({ email: req.body.email });
    //Una vez encontrado el usuario, lo comparamos desencriptandolo antes.
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      //Seteamos la contraseña a null para que no se vea en ningun punto de mi funcion.
      userInfo.password = null;
      //Creamos el token que nos crea un objeto. Para ello necesita una serie de datos para generar el token. En este caso usamos userinfo._id porque es lo "más único" que tiene el usuario y el email
      const token = jwt.sign(
        {
          id: userInfo._id,
          email: userInfo.email,
        },
        req.app.get('secretKey'),
        {
          expiresIn: '1h',
        }
        );
        //Devolvemos un json con el status 200 de ok que nos devuelve un user con todos los datos del userInfo, email y pass (a null) y el valor del token generado.
        
        return res.json({
          status: 200,
          message: HTTPSTATUSCODE[200],
          data: { user: userInfo, token: token },
        });
      }
    } catch (error) {
      return next(error);
    }
  };
  
  //Funcion para traerme todos los usuarios
  const getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find();
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { users: users },
      });
    } catch (error) {
      return next(error);
    }
  };
//Exportamos las funciones

module.exports = {
  getAllUsers,
  register,
  login,
};
