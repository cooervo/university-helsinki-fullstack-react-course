import React, {useState, useEffect} from 'react';

import personsService from '../services/persons';

const AddPerson = ({setPersons, persons}) => {

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then(res => {
        setPersons(res.data);
      });
  }, [setPersons]);

  const handleNameChange = evt => setNewName(evt.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const addPerson = e => {
    e.preventDefault();
    const person = {
      name: newName,
      number: newNumber,
    };

    personsService.createPerson(person)
      .then(person => setPersons([...persons, person]));
  };

  return (
    <form className='add-person' onSubmit={addPerson}>
      <h3>Add Person</h3>
      <div>
        <label>Name: </label>
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label>Number: </label>
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <button type="submit">save</button>
    </form>
  );
};

export default AddPerson;
