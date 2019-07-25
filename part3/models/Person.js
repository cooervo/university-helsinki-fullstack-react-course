const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
  important: Boolean,
});
const Person = mongoose.model('Person', personSchema);
const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
  date: new Date(),
});

const getAllPersons  = res => {
  Person.find({}).then(result => {
    console.log('getAllPersons() result', result)
    res.json(result);
    //todo needed? mongoose.connection.close();
  });
};

const savePerson = () => {
  person.save().then(res => {
    console.log(`added ${res.name} number ${res.number} to phonebook`);
    mongoose.connection.close();
  });
};

module.exports = {
  Person,
  getAllPersons,
  savePerson
};

