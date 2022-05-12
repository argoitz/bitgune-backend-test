const mongoose = require("mongoose");

const requestFormSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  surname: {
    type: String,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  phone: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  birth: {
    type: String,
    min: 6,
    max: 255,
  },
  sex: {
    type: String,
    min: 6,
    max: 255,
  },
  type: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  subtype: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  message: {
    type: String,
    min: 6,
    max: 2055,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RequestForm", requestFormSchema);
