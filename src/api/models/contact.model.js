const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema  = new Schema (
      {
       name: {type: String,required: false},
       email: {type: String,required: true},
       content: {type: String,required: true},
       tel: {type: String,required: false}
    },
    {timestamps: true}
    );

const Message = mongoose.model("contacto", ContactSchema);

module.exports = Message; 