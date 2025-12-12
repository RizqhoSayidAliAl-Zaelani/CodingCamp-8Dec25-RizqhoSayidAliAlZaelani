let todos = [];

// Load data from localStorage when page loads
window.onload = () => {
    const stored = localStorage.getItem("todos");
    if (stored) {
        todos = JSON.parse(stored);
    }
    renderTodos(todos);
};

// Save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Render data
function renderTodos(list) {
    const tbody = document.getElementById("todo-list");
    tbody.innerHTML = "";

    if (list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
        return;
    }

    list.forEach((item, index) => {
        let row = `
            <tr>
                <td>${item.task}</td>
                <td>${item.date}</td>
                <td>${item.completed ? "Done" : "Pending"}</td>
                <td>
                    <button class="action-btn complete-btn" onclick="toggleComplete(${index})">✓</button>
                    <button class="action-btn delete-btn" onclick="deleteTodo(${index})">✕</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Add todo
document.getElementById("add-btn").addEventListener("click", () => {
    const task = document.getElementById("todo-input").value.trim();
    const date = document.getElementById("date-input").value;

    if (task === "" || date === "") {
        alert("Please fill both fields!");
        return;
    }

    todos.push({
        task: task,
        date: date,
        completed: false
    });

    saveToLocalStorage(); // <-- save data

    document.getElementById("todo-input").value = "";
    document.getElementById("date-input").value = "";

    renderTodos(todos);
});

// Toggle status
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;

    saveToLocalStorage(); // <-- save updated status

    renderTodos(todos);
}

// Delete single todo
function deleteTodo(index) {
    todos.splice(index, 1);

    saveToLocalStorage(); // <-- save after delete

    renderTodos(todos);
}

// Delete all
document.getElementById("delete-all-btn").addEventListener("click", () => {
    if (confirm("Delete all tasks?")) {
        todos = [];
        saveToLocalStorage(); // <-- save empty list
        renderTodos(todos);
    }
});

// Filter pending tasks
document.getElementById("filter-btn").addEventListener("click", () => {
    let filtered = todos.filter(t => !t.completed);
    renderTodos(filtered);
});
