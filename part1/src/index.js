import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Feedback = (props) => {
  console.log("props1", props)
  const setToGood = () => {
    props.setGood(props.good + 1)
  };
  const setToNeutral = () => {
    props.setNeutral(props.neutral + 1)
  };
  const setToBad = () => {
    props.setBad(props.bad + 1)
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setToGood()}>good</button>
      <button onClick={() => setToNeutral()}>neutral</button>
      <button onClick={() => setToBad()}>bad</button>
    </div>
  );
};

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good: <span>{good}</span></p>
      <p>neutral: <span>{neutral}</span></p>
      <p>bad: <span>{bad}</span></p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  return (
    <div>
      <Feedback
        good={good}
        neutral={neutral}
        bad={bad}
        setGood={setGood}
        setNeutral={setNeutral}
        setBad={setBad}
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};

ReactDOM.render(<App/>,
  document.getElementById('root')
);
