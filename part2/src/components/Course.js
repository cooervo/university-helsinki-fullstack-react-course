import React from 'react';
import Part from './Part';

const Course = ({course}) => {
  const parts = course.parts.map(
    p => {
      return <Part key={p.id} part={p}/>;
    }
  );
  return (
    <>
      <h1>{course.name}</h1>
      {parts}
    </>
  );
};
export default Course;
