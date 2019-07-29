const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const database = require('./database');
const PersonRoutes = require('./person/PersonRoutes');
require('dotenv').config();

database.connectDatabase();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('build'));

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

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({error: 'malformatted id'});
  }

  next(error);
};
const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'});
};
app.use(
  morgan(loggerFormat)
);

PersonRoutes.initRoutes(app);
app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
