const mongoose = require('mongoose');


const writerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

const Writer = mongoose.model('Writer', writerSchema);

module.exports = Writer