const mongoose = require("mongoose");

const placementUpdateSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  package: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

placementUpdateSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("PlacementUpdate", placementUpdateSchema);
