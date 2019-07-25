const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
  important: Boolean,
});
const Person = mongoose.model('Person', personSchema);

const getAllPersons = cb => {
  Person.find({}).then(cb);
};

const savePerson = (personData, cb) => {
  const person = new Person({
    name: personData.name,
    number: personData.number,
    date: new Date().toISOString(),
    important: Math.random() > 0.5,

  });
  person.save().then(cb);
};

module.exports = {
  Person,
  getAllPersons,
  savePerson
};

