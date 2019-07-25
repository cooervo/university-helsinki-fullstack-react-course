const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const database = require('./database');
const Person = require('./models/Person');
require('dotenv').config();
app.use(cors());

database.connectDatabase();
app.use(express.static('build'));

app.use(bodyParser.json());

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

app.use(requestLogger);

// middleware
app.use(bodyParser.json());
const loggerFormat = ':method :url :status :res[content-length] - :response-time ms :req-body';

morgan.token('req-body', function(req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(loggerFormat)
);

app.get('/info', (req, res) => {
  res.send(`
<p>Phonebook has info for ${persons.length} people</p>
<p>${new Date()}</p>
`);
});

app.get('/api/persons', (req, res) => {
  const respondWithPersons = result => res.json(result);
  Person.getAllPersons(respondWithPersons);
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  console.log('bodybodybodybody', body)
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    });
  }

  Person.getAllPersons(persons => {
    const personData = {
      name: body.name,
      number: body.number,
    };

    const personExists = persons.filter(p => p.name === personData.name).length > 0;
    if (personExists) {
      return res.status(400).json({
        error: `Person with name ${personData.name} already exist, try with a different name`
      });
    }

    persons = [...persons, personData];
    Person.savePerson(personData, dbResponse => {
      console.log('Person.savePerson -> dbResponse', dbResponse);
      console.log(`added ${personData.name} number ${personData.number} to phonebook`);
      res.json(dbResponse)
    });

  });

});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);
  res.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'});
};

app.use(unknownEndpoint);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
