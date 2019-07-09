import React from 'react';
import Part from './Part';

const Total = ({parts}) => {
  let totalExercises =
    // get array of field exercises only
    parts.map(p => p.exercises)
      // return the sum of all exercises
      .reduce((s, p) => s + p);

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
