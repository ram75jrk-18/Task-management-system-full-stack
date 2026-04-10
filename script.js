const API_BASE = "http://127.0.0.1:5000/api";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const taskForm = document.getElementById("taskForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById("regName").value,
      email: document.getElementById("regEmail").value,
      password: document.getElementById("regPassword").value,
      role: document.getElementById("regRole").value,
    };

    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    document.getElementById("registerMessage").textContent = data.message || data.error;
    if (res.ok) registerForm.reset();
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value,
    };

    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    document.getElementById("loginMessage").textContent = data.message || data.error;
    if (res.ok) {
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 700);
    }
  });
}

if (taskForm) {
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      title: document.getElementById("taskTitle").value,
      description: document.getElementById("taskDescription").value,
      priority: document.getElementById("taskPriority").value,
      due_date: document.getElementById("taskDueDate").value,
      assigned_to: document.getElementById("taskAssignedTo").value ? Number(document.getElementById("taskAssignedTo").value) : null,
      created_by: document.getElementById("taskCreatedBy").value ? Number(document.getElementById("taskCreatedBy").value) : null,
    };

    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    document.getElementById("taskMessage").textContent = data.message || data.error;
    if (res.ok) {
      taskForm.reset();
      loadTasks();
    }
  });
}

async function loadTasks() {
  const taskList = document.getElementById("taskList");
  if (!taskList) return;

  const res = await fetch(`${API_BASE}/tasks`);
  const data = await res.json();
  taskList.innerHTML = "";

  if (!Array.isArray(data) || data.length === 0) {
    taskList.innerHTML = "<p>No tasks found.</p>";
    return;
  }

  data.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task-item";
    div.innerHTML = `
      <h3>${task.title}</h3>
      <p><strong>Description:</strong> ${task.description}</p>
      <p><strong>Status:</strong> ${task.status}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <p><strong>Assigned To:</strong> ${task.assigned_to_name || task.assigned_to || "Not assigned"}</p>
      <p><strong>Created By:</strong> ${task.created_by_name || task.created_by || "N/A"}</p>
      <p><strong>Due Date:</strong> ${task.due_date || "N/A"}</p>
      <button class="btn" onclick="markCompleted(${task.id})">Mark Completed</button>
    `;
    taskList.appendChild(div);
  });
}

async function markCompleted(taskId) {
  const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "Completed" }),
  });

  const data = await res.json();
  alert(data.message || data.error);
  loadTasks();
}

if (window.location.pathname.includes("dashboard.html")) {
  loadTasks();
}
