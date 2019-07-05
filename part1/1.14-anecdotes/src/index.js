import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const dataInitialState = {
    selected: 0,
    anecdotes: [
      {
        text: 'If it hurts, do it more often',
        votes: 0
      },
      {
        text: 'Adding manpower to a late software project makes it later!',
        votes: 0
      },
      {
        text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        votes: 0
      },
      {
        text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        votes: 0
      },
      {
        text: 'Premature optimization is the root of all evil.',
        votes: 0
      },
      {
        text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        votes: 0
      }
    ]
  };
  const [data, setData] = useState(dataInitialState);

  const onNextAnecdote = () => {
    const random = Math.floor((Math.random() * Math.floor(data.anecdotes.length)));
    setData({...data, selected: random});
  };

  const onVote = () => {
    const anecdotesWithVote = [
      ...data.anecdotes,
    ];
    anecdotesWithVote[data.selected].votes = anecdotesWithVote[data.selected].votes + 1;

    setData({
      ...data,
      anecdotes: anecdotesWithVote,
    });

  };

  const getMostVoted = () => {
    let mostVoted = data.anecdotes[0];
    data.anecdotes.forEach(a => {
      if (a.votes > mostVoted.votes) {
        mostVoted = a;
      }
    });
    return mostVoted;
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{data.anecdotes[data.selected].text}</p>
      <p>has {data.anecdotes[data.selected].votes} votes</p>
      <button onClick={() => onVote()}>vote</button>
      <button onClick={() => onNextAnecdote()}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{getMostVoted().text}</p>
      <p>has {getMostVoted().votes} votes</p>
    </>
  );
};

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
