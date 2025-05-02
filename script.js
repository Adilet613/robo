// Пример списка роботов
const robots = [
  { name: "Робот-исследователь", requiredSensors: 2, instructions: "1. Соберите базу...\n2. Установите датчики..." },
  { name: "Робот-сортировщик", requiredSensors: 4, instructions: "1. Постройте платформу...\n2. Добавьте механизм сортировки..." },
  { name: "Робот-помощник", requiredSensors: 6, instructions: "1. Соберите корпус...\n2. Установите манипуляторы..." },
];

// Регистрация пользователя
function register() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;
  if (username && password) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    alert("Регистрация успешна!");
    window.location.href = "login.html";
  } else {
    alert("Пожалуйста, заполните все поля.");
  }
}

// Вход пользователя
function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");
  if (username === storedUsername && password === storedPassword) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Неверное имя пользователя или пароль.");
  }
}

// Отображение имени пользователя на панели управления
window.onload = function () {
  if (window.location.pathname.includes("dashboard.html")) {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn !== "true") {
      window.location.href = "login.html";
    } else {
      const username = localStorage.getItem("username");
      document.getElementById("usernameDisplay").textContent = username;
    }
  }
};

// Показать доступных роботов
function showRobots() {
  const sensorCount = parseInt(document.getElementById("sensorCount").value);
  const robotListDiv = document.getElementById("robotList");
  robotListDiv.innerHTML = "";

  if (isNaN(sensorCount) || sensorCount < 0) {
    alert("Пожалуйста, введите корректное количество датчиков.");
    return;
  }

  const availableRobots = robots.filter(robot => sensorCount >= robot.requiredSensors);

  if (availableRobots.length === 0) {
    robotListDiv.innerHTML = "<p>Нет доступных роботов для сборки с таким количеством датчиков.</p>";
    return;
  }

  availableRobots.forEach(robot => {
    const robotDiv = document.createElement("div");
    robotDiv.className = "robot-item";
    robotDiv.innerHTML = `
      <h3>${robot.name}</h3>
      <p>Требуется датчиков: ${robot.requiredSensors}</p>
      <button onclick="viewInstructions('${robot.name}')">Посмотреть инструкцию</button>
    `;
    robotListDiv.appendChild(robotDiv);
  });
}

// Переход к инструкции
function viewInstructions(robotName) {
  const robot = robots.find(r => r.name === robotName);
  if (robot) {
    localStorage.setItem("selectedRobot", JSON.stringify(robot));
    window.location.href = "instructions.html";
  }
}

// Загрузка инструкции
window.onload = function () {
  if (window.location.pathname.includes("instructions.html")) {
    const robotData = localStorage.getItem("selectedRobot");
    if (robotData) {
      const robot = JSON.parse(robotData);
      document.getElementById("robotName").textContent = robot.name;
      document.getElementById("robotInstructions").textContent = robot.instructions;
    } else {
      document.getElementById("robotName").textContent = "Робот не выбран";
      document.getElementById("robotInstructions").textContent = "Пожалуйста, выберите робота на панели управления.";
    }
  }
};
