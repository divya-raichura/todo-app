// model vs schema, see 2nd ans in below link
// https://stackoverflow.com/questions/22950282/mongoose-schema-vs-model

const mongoose = require("mongoose");

// structure for all documents(rows) that we will have in our collection(table)
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name cannnot have more than 20 characters"],
  }, // if anything else that is sent in body except for what is in schema than it will be ignored
  completed: {
    type: Boolean,
    default: false,
  },
  // if body does not follow above validations, error is thrown, we manage it in controllers file
});

module.exports = mongoose.model("Task", taskSchema); // model Task is for tasks collection in the databse

// instance of a model is called document
