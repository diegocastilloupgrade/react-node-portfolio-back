const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkSchema  = new Schema (
      {
       nombre_proyecto: {type: String,required: true},
       descripcion_breve: {type: String,required: true},
       descripcion_larga: {type: String,required: true},
       url: {type: String,required: false},
       date: {type: String,required: false},
       img: {type: String,required: false},
       disciplina: {type: String,required: false},
       tecnologia: {type: String,required: false},
       company: {type: String,required: false},
    },
    {timestamps: true}
    );

    //Tenemos el modelo Work que es de la colección "works" y con el esquema workSchema.
const Work = mongoose.model("works", WorkSchema);

module.exports = Work; 