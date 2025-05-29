const API_URL = '/api/tasks';

function loadTasks() {
  fetch(API_URL)
    .then(res => res.json())
    .then(tasks => {
      const list = document.getElementById('taskList');
      list.innerHTML = '';
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
          <span onclick="toggleTask(${task.id}, ${task.completed})">${task.title}</span>
          <button onclick="deleteTask(${task.id})">Удалить</button>
        `;
        list.appendChild(li);
      });
    });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const title = input.value.trim();
  if (!title) return;

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  }).then(() => {
    input.value = '';
    loadTasks();
  });
}

function toggleTask(id, completed) {
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: '', completed: !completed })
  }).then(loadTasks);
}

function deleteTask(id) {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  }).then(loadTasks);
}

loadTasks();
