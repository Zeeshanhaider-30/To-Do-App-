// Display formatting logic for current banner date
document.addEventListener("DOMContentLoaded", () => {
    const dateElement = document.getElementById("current-date");
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today  = new Date();
    dateElement.textContent = today.toLocaleDateString("en-US", options);
});

// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load tasks from localStorage, or initialize empty array if none exist
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Initial render
renderTasks();

// Handle Form Submission (Add Task)
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const taskText = todoInput.value.trim();
    if (!taskText) return;

    const newTask = {
        id: Date.now(), 
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveAndRender();
    
    todoInput.value = ''; 
});

// Main function to display tasks on the screen
function renderTasks() {
    todoList.innerHTML = ''; 

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="actions">
                <button onclick="toggleComplete(${task.id})" aria-label="Toggle complete">
                    ${task.completed ? '↩️' : '✅'}
                </button>
                <button onclick="deleteTask(${task.id})" aria-label="Delete task">❌</button>
            </div>
        `;
        
        todoList.appendChild(li);
    });
}

// Toggle task completion status
function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveAndRender();
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
}

// Helper function to sync with LocalStorage and update UI
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}