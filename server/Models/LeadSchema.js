const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    assigned: {
      type: String,
      required: true,
    },
    stage: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true }
);

const Lead = mongoose.model("leads", leadSchema);

module.exports = Lead;
