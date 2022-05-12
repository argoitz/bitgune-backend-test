const mongoose = require("mongoose");

const subtypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subtype", subtypeSchema);
