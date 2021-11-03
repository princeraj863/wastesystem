const mongoose = require("mongoose");

const wasteData = new mongoose.Schema({
  electronic: { type: Number, default: 0 },
  plastic: { type: Number, default: 0 },
  organic: { type: Number, default: 0 },
  inorganic: { type: Number, default: 0 },
  medical: { type: Number, default: 0 },
  other: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//creating a new collection using models
const waste = mongoose.model("waste", wasteData);

module.exports = waste;
