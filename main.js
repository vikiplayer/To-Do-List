window.onload = () => {
    updateNote = "";
    count = Object.keys(localStorage).length;
    displayTasks();
};
// 
let newTask = document.getElementById("add");
let addBtn = document.getElementById("add_btn");
let radioBtn = document.getElementById("radio_btn");
let btn = document.getElementById("push");
let box = document.getElementById("task-sec")
let count = 0;
let selectedDate = "";

// when input was active then icon as changes
newTask.addEventListener("focus", function() {
    addBtn.style.display = "block";
    radioBtn.style.display = "none";
});

newTask.addEventListener("blur", function() {
    addBtn.style.display = "none";
    radioBtn.style.display = "block";
});

// button visible when start writing in input box

newTask.addEventListener('input', function() {
    let input = this.value;
    let count = input.length;
    
    if (count > 0) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
});

// for box visble

if (count == 0) {
    box.style.display = "none";
}

// 

// Load tasks from local storage and display them
function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(task => {
        box.innerHTML += `
            <div class="taskss">    
                <div class="check-box">
                    <button class="check-box-btn">
                        <i class="fa-solid fa-check checked" style="display: ${task.checked ? 'block' : 'none'};"></i>
                        <i class="fa-regular fa-circle unchecked" style="display: ${task.checked ? 'none' : 'block'};"></i>
                    </button>
                </div>
                <div class="task-name" style="text-decoration: ${task.checked ? 'line-through' : 'none'};">
                    ${task.name} <br>
                    <h6>${task.date}</h6>
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
    if (count != 0) {
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
    let tasks = [];
    document.querySelectorAll(".taskss").forEach(taskElement => {
        let taskName = taskElement.querySelector(".task-name").textContent.trim();
        let checked = taskElement.querySelector(".checked").style.display === "block";
        let important = taskElement.querySelector(".iimportant").style.display === "block";
        let todayTask = taskElement.querySelector(".date").textContent.trim();
        tasks.push({ name: taskName, checked: checked, important: important, date: todayTask });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// calander

// Get the calendar icon and the calendar section
const calendarIcon = document.querySelector('.calendar-icon i');
const calendarSection = document.querySelector('.section');
const dateElements = document.querySelectorAll('.date li'); // Assuming dates are in <li> elements

// Event listener to toggle the calendar when the icon is clicked
calendarIcon.addEventListener('click', function() {
    if (calendarSection.style.display === 'none' || calendarSection.style.display === '') {
        calendarSection.style.display = 'block';
    } else {
        calendarSection.style.display = 'none';
    }
});

// Event listener for date selection
dateElements.forEach(date => {
    date.addEventListener('click', function() {
        // Assuming you handle date selection here
        calendarSection.style.display = 'none'; // Hide the calendar after selecting a date
    });
});

btn.addEventListener('click', function() {
    calendarSection.style.display = 'none'; // Hide the calendar when Enter is clicked
});

btn.addEventListener("click", addTask);
newTask.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// 

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

    // Adding the days from the previous month
    for (let i = ldlm - firstDayIndex + 1; i <= ldlm; i++) {
        liTag += `<li class="non-active">${i}</li>`;
    }

    // Adding the days of the current month
    for (let i = 1; i <= lastDate; i++) {  
        // Get today's date, month, and year
        let todayDate = date.getDate();
        let todayMonth = new Date().getMonth();
        let todayYear = new Date().getFullYear();
        
        // Format today's date as a string "dd-mm-yyyy"
        let toDay = String(todayDate) + "-" + String(todayMonth + 1) + "-" + String(todayYear);
        let currentDateString = String(i) + "-" + String(thisMonth + 1) + "-" + String(thisYear)        
        if (new Date(thisYear, thisMonth, i) > new Date(todayYear, todayMonth, todayDate)) {
            liTag += `<li>${i}</li>`;
        } else if ((toDay) == (currentDateString)) {
            liTag += `<li class="active">${i}</li>`;
        } else {
            liTag += `<li class="non-active">${i}</li>`;
        }
    }
    
      

    let nextDays = 7 - ((firstDayIndex + lastDate) % 7);
    if (nextDays < 7) {  // Only add these if we need to fill the last row
        for (let i = 1; i <= nextDays; i++) {
            liTag += `<li class="non-active">${i}</li>`;
        }
    }

    
    currentDate.textContent = `${month[thisMonth]} ${thisYear}`;
    dates.innerHTML = liTag;

    // Add event listener to each date to print the selected date
    const dateItems = dates.querySelectorAll("li:not(.non-active)");
    dateItems.forEach(item => {
        item.addEventListener("click", () => {
            let selectedDay = item.textContent;
            selectedDate = `${selectedDay}-${thisMonth+1}-${thisYear}`;
            return selectedDate
        });
        saveTasksToLocalStorage();
    });
}

runCal();

pre.addEventListener("click",() =>{
    thisMonth--;

    // Handle the case when the month goes below January
    if (thisMonth < 0) {
        thisMonth = 11;  // Set to December
        thisYear--;      // Decrement the year
    }
    
    runCal();
});

nxt.addEventListener("click",() =>{
    thisMonth++;

    // Handle the case when the month goes above December
    if (thisMonth > 11) {
        thisMonth = 0;   // Set to January
        thisYear++;      // Increment the year
    }
    
    runCal();
});

// 


//adding task

function addTask() {
    if (newTask.value.length > 0) {
        box.innerHTML += `
            <div class="taskss">    
                <div class="check-box">
                    <button class="check-box-btn">
                        <i class="fa-solid fa-check checked" style="display: none;"></i>
                        <i class="fa-regular fa-circle unchecked"></i>
                    </button>
                </div>
                <div class="task-name">
                    ${newTask.value} <br>
                    <h6 class="date"> ${selectedDate} </h6>
                </div>
                <div class="important">
                    <button class="important-btn">
                        <i class="fa-solid fa-star iimportant" style="display: none;"></i>
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

        newTask.value = '';
        saveTasksToLocalStorage();
    } else {
        alert("Please Enter a Task");
    }
    
    let tasks = document.querySelectorAll(".taskss");
    count = tasks.length;
    
    if (count != 0) {
        box.style.display = "block";
    }
    
    return count;    
}

// Add task on button click or Enter key press
btn.addEventListener("click", addTask);
newTask.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Handle task box clicks
box.addEventListener("click", function(event) {
    // Handle delete button click
    if (event.target.closest(".delete-btn")) {
        let task = event.target.closest(".taskss");
        task.remove();
        count--;
        if (count == 0) {
            box.style.display = "none";
        }
        saveTasksToLocalStorage();
    }

    // Handle important button click
    if (event.target.closest(".important-btn")) {
        let importantBtn = event.target.closest(".important-btn");
        let notImportantIcon = importantBtn.querySelector(".not-important");
        let importantIcon = importantBtn.querySelector(".iimportant");

        // Toggle the display of the important and not-important icons
        if (importantIcon.style.display === "none") {
            importantIcon.style.display = "block";
            notImportantIcon.style.display = "none";
        } else {
            importantIcon.style.display = "none";
            notImportantIcon.style.display = "block";
        }
        saveTasksToLocalStorage();
    }

    // Handle check box button click
    if (event.target.closest(".check-box-btn")) {
        let checkBtn = event.target.closest(".check-box-btn");
        let unchecked = checkBtn.querySelector(".unchecked");
        let checked = checkBtn.querySelector(".checked");
        let taskName = event.target.closest(".taskss").querySelector(".task-name");
        // Toggle the display of the checked and unchecked icons
        if (checked.style.display === "none") {
            checked.style.display = "block";
            unchecked.style.display = "none";
            taskName.style.textDecoration = "line-through";
            
        } else {
            checked.style.display = "none";
            unchecked.style.display = "block";
            taskName.style.textDecoration = "none";
        }
        saveTasksToLocalStorage();
        
    }
});



