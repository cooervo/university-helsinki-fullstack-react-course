const PersonModel = require('./PersonModel');

const initRoutes = app => {
  app.get('/api/persons', (req, res) => {
    const respondWithPersons = result => res.json(result);
    PersonModel.getAllPersons(respondWithPersons);
  });

  app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
      return res.status(400).json({
        error: 'name or number missing'
      });
    }

    PersonModel.getAllPersons(persons => {
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

      PersonModel.savePerson(personData, dbResponse => {
        console.log('Person.savePerson -> dbResponse', dbResponse);
        console.log(`added ${personData.name} number ${personData.number} to phonebook`);
        dbResponse._id = dbResponse._id.toString();
        res.json(dbResponse);
      });

    });

  });

  app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id.toString();
    PersonModel.deleteById(id, result => {
      res.json(result).status(204).end()
    });

  });
};

module.exports = {initRoutes};
