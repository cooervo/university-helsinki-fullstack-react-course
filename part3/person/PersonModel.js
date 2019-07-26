const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
  important: Boolean,
});
const PersonModel = mongoose.model('Person', personSchema);

const getAllPersons = cb => {
  PersonModel.find({}).then(cb);
};

const savePerson = (personData, cb) => {
  const person = new PersonModel({
    name: personData.name,
    number: personData.number,
    date: new Date().toISOString(),
    important: Math.random() > 0.5,

  });
  person.save().then(cb);
};

const deleteById = (id, cb) => {
  PersonModel.findByIdAndRemove(id)
    .then(cb)
    .catch(error => {})
}
module.exports = {
  PersonModel,
  getAllPersons,
  deleteById,
  savePerson
};

