import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Feedback = (props) => {
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
    <>
      <h1>give feedback</h1>
      <button onClick={() => setToGood()}>good</button>
      <button onClick={() => setToNeutral()}>neutral</button>
      <button onClick={() => setToBad()}>bad</button>
    </>
  );
};

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const average = ((good - bad)/all || 0);
  const positiveAverage = (good/all || 0);
  return (
    <>
      <h1>statistics</h1>
      <p>good: <span>{good}</span></p>
      <p>neutral: <span>{neutral}</span></p>
      <p>bad: <span>{bad}</span></p>
      <p>all: <span>{all}</span></p>
      <p>average: <span>{average}</span></p>
      <p>positive: <span>{positiveAverage} %</span></p>
    </>
  );
};

const App = () => {
  // save clicks of each button to own state

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  return (
    <>
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
    </>
  );
};

ReactDOM.render(<App/>,
  document.getElementById('root')
);
