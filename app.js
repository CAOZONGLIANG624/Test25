document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const addTaskButton = document.getElementById('add-task');

addTaskButton.addEventListener('click', function() {
    const taskValue = taskInput.value.trim();
    
    if (taskValue) {
        addTask(taskValue);
        taskInput.value = '';
    }
});

function addTask(taskValue) {
    const li = document.createElement('li');
    li.textContent = taskValue;

    // Create complete button
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.onclick = function() {
        li.classList.toggle('completed');
        saveTasks();
    };
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        const newTaskValue = prompt("Edit Task", taskValue);
        if (newTaskValue) {
            li.firstChild.textContent = newTaskValue;
            saveTasks();
        }
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        taskList.removeChild(li);
        saveTasks();
    };

    li.appendChild(completeButton);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.onclick = function() {
            li.classList.toggle('completed');
            saveTasks();
        };

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            const newTaskValue = prompt("Edit Task", task.text);
            if (newTaskValue) {
                li.firstChild.textContent = newTaskValue;
                saveTasks();
            }
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}