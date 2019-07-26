import React from 'react';

const Person = ({person, deletePerson}) => {

  return (
    <li className='person'>
      Name: {person.name}
      <br/>
      Number: {person.number}
      <br/>
      <button onClick={deletePerson(person._id)}>Delete</button>
    </li>
  );
};

export default Person;
