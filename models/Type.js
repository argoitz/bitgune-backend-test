const mongoose = require("mongoose");
const Subtype = require("./Subtype");

const typeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  subtypes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subtype",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Type", typeSchema);
