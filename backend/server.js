const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

let tasks = [];
let id = 1;

// получить все задачи
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// добавить задачу
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = { id: id++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// изменить задачу
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, completed } = req.body;

  const task = tasks.find(t => t.id === taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.title = title;
  task.completed = completed;
  res.json(task);
});

// удалить задачу
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
