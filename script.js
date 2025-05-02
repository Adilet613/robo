const robots = [
    { id: 1, name: "Марсоход", requiredParts: 100, instructions: "Собери корпус, установи колёса и датчики." },
    { id: 2, name: "Сортировщик", requiredParts: 70, instructions: "Создай платформу, добавь сенсоры и механизм сортировки." },
    { id: 3, name: "Лабиринт", requiredParts: 50, instructions: "Построй базу, установи датчик линии и моторы." }
];

function registerUser() {
    let email = document.getElementById("email").value;
    let parts = parseInt(document.getElementById("parts").value);
    let sensors = parseInt(document.getElementById("sensors").value);

    if (email && parts > 0 && sensors > 0) {
        localStorage.setItem("userParts", parts);
        window.location.href = "robots.html"; 
    } else {
        alert("Заполните все поля!");
    }
}

function displayAvailableRobots() {
    let userParts = parseInt(localStorage.getItem("userParts")) || 0;
    let list = document.getElementById("robot-list");

    robots.forEach(robot => {
        if (userParts >= robot.requiredParts) {
            let li = document.createElement("li");
            li.innerHTML = `<a href="instructions.html?id=${robot.id}">${robot.name}</a>`;
            list.appendChild(li);
        }
    });
}

function loadInstructions() {
    let urlParams = new URLSearchParams(window.location.search);
    let robotId = urlParams.get("id");

    let robot = robots.find(r => r.id == robotId);
    if (robot) {
        document.getElementById("robot-name").innerText = robot.name;
        document.getElementById("robot-instructions").innerText = robot.instructions;
    } else {
        document.getElementById("robot-name").innerText = "Ошибка";
        document.getElementById("robot-instructions").innerText = "Робот не найден.";
    }
}
