const mongoose = require("mongoose");

const menstrualDataSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  symptoms: {
    type: [String], // Array of symptoms
    default: [],
  },
  mood: {
    type: String,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MenstrualData", menstrualDataSchema);
