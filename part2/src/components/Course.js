import React from 'react';
import Part from './Part';

const Total = ({parts}) => {
  let totalExercises = 0;
  parts.forEach(p => {
    totalExercises = p.exercises + totalExercises;
  });

  return (
    <p>
      <strong>
        total of {totalExercises} exercises
      </strong>
    </p>
  );
};

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
      <Total parts={course.parts}/>
    </>
  );
};
export default Course;
