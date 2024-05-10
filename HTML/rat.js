const express = require('express');
const app = express();

app.use(express.json());

let tasks = [];
let currentId = 1;

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = {
        id: currentId++,
        title,
        completed: false
    };
    tasks.push
