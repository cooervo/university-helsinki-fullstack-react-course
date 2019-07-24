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

const getAllPersons = () => {
  console.log('phonebook:');
  Person.find({}).then(result => {
    result.forEach(p => {
      console.log(`${p.name} ${p.number}`);
    });
    mongoose.connection.close();
    process.exit(1);
  });
};

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

if (process.argv.length < 5) {
  getAllPersons();
}

const password = process.argv[2];

const url =
  `mongodb+srv://cooervo:${password}@cluster0-uv6i1.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true});

person.save().then(res => {
  console.log(`added ${res.name} number ${res.number} to phonebook`);
  mongoose.connection.close();
});

