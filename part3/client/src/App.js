import React, {useState, useEffect} from 'react';
import Person from './components/Person';
import Notification from './components/Notification';
import Footer from './components/Footer';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Allows the use of side effects in function components
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    personsService
      .getAll()
      .then(res => {
        setPersons(res.data);
      });
  }, []);

  const personsToShow = showAll
    ? persons
    : persons.filter(p => p.important);
  const rows = () => personsToShow.map(person =>
    <Person
      key={person._id}
      person={person}
      toggleImportance={() => toggleImportanceOf(person.id)}
    />
  );

  const handleNameChange = evt => setNewName(evt.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const addPerson = e => {
    e.preventDefault();
    const person = {
      name: newName,
      number: newNumber,
    };

    personsService
      .create(person)
      .then(data => {
        debugger
        setPersons(persons.concat(data));
        // todo needed? setNewPerson('');
      });
  };

  const toggleImportanceOf = id => {
    const person = persons.find(p => p.id === id);
    const changedNote = {...person, important: !person.important};

    personsService
      .update(id, changedNote)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== id ? p : returnedPerson));
      })
      .catch(error => {
        setErrorMessage(
          `Note '${person.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setPersons(persons.filter(p => p.id !== id));
      });

  };

  return (
    <div>
      <h1>Persons</h1>

      <Notification message={errorMessage}/>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addPerson}>
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

      <Footer/>
    </div>
  );
};

export default App;
