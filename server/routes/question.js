import express from 'express';

const app = express.Router();

const question = {
  _id: 1,
  title: '¿Cómo reutilizo un componente en Android?',
  description: 'Miren esta es mi pregunta...',
  createdAt: new Date(),
  icon: 'devicon-android-plain',
  answers: [],
  user: {
    firstName: 'Ernesto',
    lastName: 'García',
    email: 'ernestognw@gmail.com',
    password: 'Fran1Host1'
  }
}

const questions = new Array(10).fill(question);

//GET /api/questions
app.get('/', (req, res) => res.status(200).json(questions))

//GET /api/questions/:id
app.get('/:id', (req, res) => {
  const { id } = req.params;
  const q = questions.find(({ _id }) =>  _id === +id );
  res.status(200).json(q);
})

// POST /api/questions
app.post('/', (req, res) => {
  const question = req.body;
  question._id = +new Date();
  question.user = {
    email: 'ernestognw@gmail.com',
    password: 'Fran1Host1',
    firstName: 'Ernesto',
    secondName: 'García',
  }
  question.createdAt =  new Date();
  question.answers = [];
  questions.push(question);
  res.status(201).json(question);
})

export default app;
