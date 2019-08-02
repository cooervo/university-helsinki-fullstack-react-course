const PersonModel = require('./PersonModel');

const initRoutes = app => {

  app.get('/info', (req, res) => {
    PersonModel.getAllPersons(persons => {
      res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
      `);
    });
  });

  app.get('/api/persons', (req, res) => {
    const respondWithPersons = result => res.json(result);
    PersonModel.getAllPersons(respondWithPersons);
  });

  app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    PersonModel.findPerson(id, foundPerson => {
      res.json(foundPerson);
    });
  });

  app.post('/api/persons', (req, res) => {
    const body = req.body;

    PersonModel.getAllPersons(persons => {
      const personData = {
        name: body.name,
        number: body.number,
      };

      PersonModel.savePerson(personData,
        dbResponse => {
          if (dbResponse.error) {
            res.json(dbResponse.toJSON()).end();
          }
          dbResponse._id = dbResponse._id.toString();
          res.json(dbResponse);
        },
        err => {
          res.json(err.toJSON()).end();
        });
    });
  });

  app.put('/api/persons/:id', (req, res) => {
    PersonModel.updatePerson(req,
      updatedPerson => {
        res.json(updatedPerson.toJSON());
      },
      err => {
        res.json(err.toJSON());
      });
  });

  app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id.toString();
    PersonModel.deleteById(id, result => {
      res.json(result).status(204).end();
    });

  });
};

module.exports = {initRoutes};
