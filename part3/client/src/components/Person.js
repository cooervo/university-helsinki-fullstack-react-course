import React from 'react';

const Person = ({person, toggleImportance}) => {
  // todo needed? const label = person.important ? 'make not important' : 'make important';

  return (
    <li className='person'>
      Name: {person.name}
      <br/>
      Number: {person.number}
      {/*TODO needed? <button onClick={toggleImportance}>{label}</button>*/}
    </li>
  );
};

export default Person;
