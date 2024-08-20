window.onload = () => {
    updateNote = "";
    count = Object.keys(localStorage).length;
    displayTasks();
};

// Global Variables
let newTask = document.getElementById("add");
let addBtn = document.getElementById("add_btn");
let radioBtn = document.getElementById("radio_btn");
let btn = document.getElementById("push");
let box = document.getElementById("task-sec");
let count = 0;
let selectedDate = "";
let selected = document.getElementById("selected");
let bellIcon = document.querySelector(".icon_fun .fa-bell");
let reminderTimeInput = document.getElementById("reminder-time");
let selectedTimeDiv = document.getElementById("selectedTime");
let selectedTime = "";
const icon = document.querySelector(".btn");

function expand(){
    let menu= document.querySelector(".nav");
    menu.classList.toggle("active");
}

icon.addEventListener('click', expand);

// When input is focused, change icons
newTask.addEventListener("focus", function() {
    addBtn.style.display = "block";
    radioBtn.style.display = "none";
});

newTask.addEventListener("blur", function() {
    addBtn.style.display = "none";
    radioBtn.style.display = "block";
});

// Show button when there is input
newTask.addEventListener('input', function() {
    let input = this.value;
    let count = input.length;
    
    if (count > 0) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
});

// Hide task box if no tasks are present
if (count == 0) {
    box.style.display = "none";
}

// Load tasks from local storage and display them
function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    box.innerHTML = ''; // Clear previous tasks

    tasks.forEach(task => {
        let separator = (task.date && task.time) ? "<li>|</li>" : "";
        box.innerHTML += `
            <div class="taskss">    
                <div class="check-box">
                    <button class="check-box-btn">
                        <i class="fa-solid fa-check checked" style="display: ${task.checked ? 'block' : 'none'};"></i>
                        <i class="fa-regular fa-circle unchecked" style="display: ${task.checked ? 'none' : 'block'};"></i>
                    </button>
                </div>
                <div class="task-name">
                    <ul class="taskList">
                        <li style="text-decoration: ${task.checked ? 'line-through' : 'none'};">
                            <h4 class="date">${task.name}</h4>
                        </li>
                        ${task.date ? `
                        <li style="text-decoration: ${task.checked ? 'line-through' : 'none'};">
                            <p class="date">${task.date}</p>
                        </li>` : ''}
                        ${task.date && task.time ? `
                        <li style="text-decoration: ${task.checked ? 'line-through' : 'none'};">
                            ${separator}
                        </li>` : ''}
                        ${task.time ? `
                        <li style="text-decoration: ${task.checked ? 'line-through' : 'none'};">
                            <p class="time">${task.time}</p>
                        </li>` : ''}
                    </ul>
                </div>
                <div class="important">
                    <button class="important-btn">
                        <i class="fa-solid fa-star iimportant" style="display: ${task.important ? 'block' : 'none'};"></i>
                        <i class="fa-regular fa-star not-important" style="display: ${task.important ? 'none' : 'block'};"></i>
                    </button>
                </div>
                <div class="delete">
                    <button class="delete-btn">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>  
        `;
    });

    count = tasks.length;
    box.style.display = count !== 0 ? "block" : "none";
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
    let tasks = [];
    document.querySelectorAll(".taskss").forEach(taskElement => {
        let taskName = taskElement.querySelector(".task-name h4.date").textContent.trim();
        let checked = taskElement.querySelector(".checked").style.display === "block";
        let important = taskElement.querySelector(".iimportant").style.display === "block";
        let taskDate = taskElement.querySelector(".task-name p.date")?.textContent.trim() || "";
        let taskTime = taskElement.querySelector(".task-name p.time")?.textContent.trim() || "";
        tasks.push({ name: taskName, checked: checked, important: important, date: taskDate, time: taskTime });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Calendar functionality
const calendarIcon = document.querySelector('.calendar-icon i');
const calendarSection = document.querySelector('.section');
const dateElements = document.querySelectorAll('.date li');

calendarIcon.addEventListener('click', function() {
    if (calendarSection.style.display === 'none' || calendarSection.style.display === '') {
        calendarSection.style.display = 'block';
    } else {
        calendarSection.style.display = 'none';
    }
});

dateElements.forEach(date => {
    date.addEventListener('click', function() {
        calendarSection.style.display = 'none';
    });
});

btn.addEventListener('click', function() {
    calendarSection.style.display = 'none';
});

btn.addEventListener("click", addTask);
newTask.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Calendar rendering logic
const currentDate = document.querySelector(".thismonth");
const dates = document.querySelector(".date");
const pre = document.getElementById("per");
const nxt = document.getElementById("nxt");
let date = new Date();
let thisYear = date.getFullYear();
let thisMonth = date.getMonth();

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const runCal = () => {
    let firstDayIndex = new Date(thisYear, thisMonth, 1).getDay();
    let lastDate = new Date(thisYear, thisMonth + 1, 0).getDate();
    let ldlm = new Date(thisYear, thisMonth, 0).getDate();
    let liTag = "";

    for (let i = ldlm - firstDayIndex + 1; i <= ldlm; i++) {
        liTag += `<li class="non-active">${i}</li>`;
    }

    for (let i = 1; i <= lastDate; i++) {  
        let todayDate = date.getDate();
        let todayMonth = new Date().getMonth();
        let todayYear = new Date().getFullYear();
        
        let toDay = String(todayDate) + "-" + String(todayMonth + 1) + "-" + String(todayYear);
        let currentDateString = String(i) + "-" + String(thisMonth + 1) + "-" + String(thisYear);        
        if (new Date(thisYear, thisMonth, i) > new Date(todayYear, todayMonth, todayDate)) {
            liTag += `<li>${i}</li>`;
        } else if ((toDay) == (currentDateString)) {
            liTag += `<li class="active">${i}</li>`;
        } else {
            liTag += `<li class="non-active">${i}</li>`;
        }
    }

    let nextDays = 7 - ((firstDayIndex + lastDate) % 7);
    if (nextDays < 7) {
        for (let i = 1; i <= nextDays; i++) {
            liTag += `<li class="non-active">${i}</li>`;
        }
    }

    currentDate.textContent = `${month[thisMonth]} ${thisYear}`;
    dates.innerHTML = liTag;

    const dateItems = dates.querySelectorAll("li:not(.non-active)");
    dateItems.forEach(item => {
        item.addEventListener("click", () => {
            let selectedDay = item.textContent;
            selectedDate = `${selectedDay}-${thisMonth+1}-${thisYear}`;
            calendarSection.style.display = 'none'; 
            showDate();
        });
    });
}

runCal();

pre.addEventListener("click",() =>{
    thisMonth--;
    if (thisMonth < 0) {
        thisMonth = 11;
        thisYear--;
    }
    runCal();
});

nxt.addEventListener("click",() =>{
    thisMonth++;
    if (thisMonth > 11) {
        thisMonth = 0;
        thisYear++;
    }
    runCal();
});

function showDate() {
    selected.innerHTML = `<p>${selectedDate}</p>`;
    selected.style.display = "block";
}

// Reminder icon and time picker
bellIcon.addEventListener("click", function() {
    reminderTimeInput.style.display = reminderTimeInput.style.display === "block" ? "none" : "block";
});

reminderTimeInput.addEventListener("change", function() {
    selectedTime = this.value;
    selectedTimeDiv.innerHTML = `<p>${selectedTime.replace("T", " ")}</p>`;
    selectedTimeDiv.style.display = "block";
});

function addTask() {
    let inputValue = newTask.value.trim();
    
    if (inputValue === "") {
        return;
    }

    box.style.display = "block";

    let separator = (selectedDate && selectedTime) ? "<li>|</li>" : "";

    box.innerHTML += `
        <div class="taskss">    
            <div class="check-box">
                <button class="check-box-btn">
                    <i class="fa-solid fa-check checked" style="display:none;"></i>
                    <i class="fa-regular fa-circle unchecked"></i>
                </button>
            </div>
            <div class="task-name">
                <ul class="taskList">
                    <li><h4 class="date">${inputValue}</h4></li>
                    ${selectedDate ? `<li><p class="date">${selectedDate}</p></li>` : ''}
                    ${selectedDate && selectedTime ? `<li>${separator}</li>` : ''}
                    ${selectedTime ? `<li><p class="time">${selectedTime}</p></li>` : ''}
                </ul>
            </div>
            <div class="important">
                <button class="important-btn">
                    <i class="fa-solid fa-star iimportant" style="display:none;"></i>
                    <i class="fa-regular fa-star not-important"></i>
                </button>
            </div>
            <div class="delete">
                <button class="delete-btn">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>  
    `;

    count++;
    box.style.display = count !== 0 ? "block" : "none";
    newTask.value = "";
    selectedDate = ""; // Clear selected date
    selectedTime = ""; // Clear selected time
    selected.innerHTML = ""; // Clear displayed date
    selectedTimeDiv.innerHTML = ""; // Clear displayed time
    btn.style.display = "none";
    saveTasksToLocalStorage();
}

// Handle task checkbox toggle
box.addEventListener("click", function(event) {
    if (event.target.closest(".check-box-btn")) {
        let taskElement = event.target.closest(".taskss");
        let checkedIcon = taskElement.querySelector(".checked");
        let uncheckedIcon = taskElement.querySelector(".unchecked");
        let taskNameElement = taskElement.querySelector(".task-name .taskList li");

        if (checkedIcon.style.display === "block") {
            checkedIcon.style.display = "none";
            uncheckedIcon.style.display = "block";
            taskNameElement.style.textDecoration = "none";
        } else {
            checkedIcon.style.display = "block";
            uncheckedIcon.style.display = "none";
            taskNameElement.style.textDecoration = "line-through";
        }
        saveTasksToLocalStorage();
    }
});


// Handle task importance toggle
box.addEventListener("click", function(event) {
    if (event.target.closest(".important-btn")) {
        let taskElement = event.target.closest(".taskss");
        let importantIcon = taskElement.querySelector(".iimportant");
        let notImportantIcon = taskElement.querySelector(".not-important");
        
        if (importantIcon.style.display === "block") {
            importantIcon.style.display = "none";
            notImportantIcon.style.display = "block";
        } else {
            importantIcon.style.display = "block";
            notImportantIcon.style.display = "none";
        }
        saveTasksToLocalStorage();
    }
});

// Handle task deletion
box.addEventListener("click", function(event) {
    if (event.target.closest(".delete-btn")) {
        let taskElement = event.target.closest(".taskss");
        taskElement.remove();
        count--;
        box.style.display = count != 0 ? "block" : "none";
        saveTasksToLocalStorage();
    }
});
