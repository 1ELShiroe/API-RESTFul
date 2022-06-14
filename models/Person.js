const db = require("mongoose");

const Person = db.model('Person', {
  name: String,
  salary: Number,
  approved: Boolean,
})

module.exports = Person