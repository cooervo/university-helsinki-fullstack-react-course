import React, {useState} from 'react';
import Person from './components/Person';
import Notification from './components/Notification';
import Footer from './components/Footer';
import AddPerson from './components/AddPerson';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const personsList = () => persons.map(person =>
    <Person
      key={person._id}
      person={person}
      deletePerson={deletePerson}
    />
  );

  const deletePerson = id => {
    return () => {
      personsService.deleteById(id)
        .then(deletedPerson => {
          const filteredPersons = persons.filter(p => p._id !== deletedPerson._id);
          setPersons(filteredPersons);
        });
    };
  };

  return (
    <div>
      <h1>Persons</h1>
      <Notification
        message={errorMessage}
        />
      <ul className='persons-list'>
        {personsList()}
      </ul>
      <AddPerson
        persons={persons}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}/>
      <Footer/>
    </div>
  );
};

export default App;
