const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Add button click
addBtn.addEventListener("click", addTask);

// Enter key support
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    createTaskElement(taskText, false);
    saveToLocalStorage();

    taskInput.value = "";
}

// Create task element
function createTaskElement(taskText, isCompleted) {
    const li = document.createElement("li");
    li.textContent = taskText;

    if (isCompleted) {
        li.classList.add("completed");
    }

    // Toggle complete
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveToLocalStorage();
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        taskList.removeChild(li);
        saveToLocalStorage();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Save tasks to LocalStorage
function saveToLocalStorage() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from LocalStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}
v0