const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
  important: Boolean,
});
const PersonModel = mongoose.model('Person', personSchema);

const getAllPersons = cb => {
  PersonModel.find({})
    .then(cb)
    .catch(err => next(err));
};

const savePerson = (personData, cb) => {
  const person = new PersonModel({
    name: personData.name,
    number: personData.number,
    date: new Date().toISOString(),
    important: Math.random() > 0.5,
  });
  person.save()
    .then(cb)
    .catch(err => next(err));
};

const deleteById = (id, cb) => {
  PersonModel.findByIdAndRemove(id)
    .then(cb)
    .catch(err => next(err));
};

const findPerson = (id, cb) => {
  const person = PersonModel.findById(id).then(cb);
};

const updatePerson = (req, cb) => {
  const person = {
    number: req.body.number,
  };
  const filter = {name: person.name};
  const update = {number: person.number};
  console.log('ooooo filter', filter);
  console.log('ooooo update', update);
  PersonModel.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson => {
      cb(updatedPerson);
    })
    .catch(error => next(error));
};

module.exports = {
  PersonModel,
  getAllPersons,
  deleteById,
  savePerson,
  updatePerson,
  findPerson
};

