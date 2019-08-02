const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const personSchema = new mongoose.Schema({
  name: {type: String, index:true, required: true, unique: true, minlength: 3,},
  number: {type: String, unique: false, required: true, minlength: 8},
  date: {type: Date, unique: false, required: true},
});

personSchema.plugin(uniqueValidator);

const PersonModel = mongoose.model('Person', personSchema);

const getAllPersons = cb => {
  PersonModel.find({})
    .then(cb)
    .catch(err => next(err));
};

const savePerson = (personData, cb, errorCb) => {
  const person = new PersonModel({
    name: personData.name,
    number: personData.number,
    date: new Date().toISOString()
  });
  person.save()
    .then(cb)
    .catch(errorCb);
};

const deleteById = (id, cb) => {
  PersonModel.findByIdAndRemove(id)
    .then(cb)
    .catch(err => next(err));
};

const findPerson = (id, cb) => {
  const person = PersonModel.findById(id).then(cb);
};

const updatePerson = (req, cb, errorCb) => {
  const person = {
    number: req.body.number,
  };
  const filter = {name: person.name};
  const update = {number: person.number};
  PersonModel.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson => {
      cb(updatedPerson);
    })
    .catch(err => errorCb);
};

module.exports = {
  PersonModel,
  getAllPersons,
  deleteById,
  savePerson,
  updatePerson,
  findPerson
};

