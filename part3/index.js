const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan')

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "300",
    id: 4
  },
  {
    name: "Dan Abramov",
    number: "400",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "500",
    id: 4
  },
]

// middleware
app.use(bodyParser.json())
const loggerFormat = ':method :url :status :res[content-length] - :response-time ms :req-body';

morgan.token('req-body', function (req, res) {
  return JSON.stringify(req.body)
})

app.use(
  morgan(loggerFormat)
)

app.get('/info', (req, res) => {
  res.send(`
<p>Phonebook has info for ${persons.length} people</p>
<p>${new Date()}</p>
`);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

const getRandomId = () => {
  return Math.ceil(Math.random() * ( 100000 - 10))
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if(!body.name || !body.number){
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  const person = {
    name : body.name,
    number: body.number,
    id: getRandomId()
  }

  const personExists = persons.filter(p=>p.name === person.name).length > 0
  if(personExists){
    return res.status(400).json({
      error: `Person with name ${person.name} already exist, try with a different name`
    })
  }

  persons = [...persons, person]
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id)
  if(person){
    res.json(person)
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res)=>{
  const id = Number(req.params.id)
  persons = persons.filter(p=>p.id !== id)
  res.status(204).end()
})

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
