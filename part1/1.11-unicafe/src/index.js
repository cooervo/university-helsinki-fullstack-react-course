import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Feedback = (props) => {
  const setToGood = () => {
    props.setGood(props.good + 1);
  };
  const setToNeutral = () => {
    props.setNeutral(props.neutral + 1);
  };
  const setToBad = () => {
    props.setBad(props.bad + 1);
  };

  return (
    <>
      <button onClick={() => setToGood()}>good</button>
      <button onClick={() => setToNeutral()}>neutral</button>
      <button onClick={() => setToBad()}>bad</button>
    </>
  );
};

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}: {value}</td>
    </tr>
  );
};
const Statistics = ({good, neutral, bad}) => {
  const isPristine = good + neutral + bad === 0;
  if (isPristine) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }
  const all = good + neutral + bad;
  const average = ((good - bad) / all || 0);
  const positiveAverage = (good / all || 0) + '%';
  return (
    <table>
      <tbody>
      <Statistic text="good" value={good}/>
      <Statistic text="neutral" value={neutral}/>
      <Statistic text="bad" value={bad}/>
      <Statistic text="all" value={all}/>
      <Statistic text="average" value={average}/>
      <Statistic text="positive" value={positiveAverage}/>
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to own state

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Feedback
        good={good}
        neutral={neutral}
        bad={bad}
        setGood={setGood}
        setNeutral={setNeutral}
        setBad={setBad}
      />
      <h1>statistics</h1>
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
