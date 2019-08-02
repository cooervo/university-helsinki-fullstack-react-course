import React, {useState, useEffect} from 'react';

import personsService from '../services/persons';

const AddPerson = ({setPersons, persons, setErrorMessage}) => {

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
  const personExists = person => persons.find(p => person.name === p.name);

  const addPerson = e => {
    e.preventDefault();
    const person = {
      name: newName,
      number: newNumber,
    };
    const pExists = personExists(person);
    if (pExists) {
      personsService.updatePerson(pExists._id, person)
        .then(updatedPerson => {
          const index = persons.findIndex(p => p.name === person.name);
          persons[index] = updatedPerson;
          setPersons([...persons]);
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    } else {
      personsService.createPerson(person)
        .then(res => {
          if (res.errors) {
            setErrorMessage(res.message);
            return;
          }

          const person = res;
          setPersons([...persons, person]);
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    }
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
