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
let categoryIcon = document.querySelector(".icon_fun .fa-folder");
let reminderTimeInput = document.getElementById("reminder-time");
let selectedTimeDiv = document.getElementById("selectedTime");
let selectedTime = "";
const icon = document.querySelector(".btn");
let editDateInput = document.getElementById("edit-task-date-main");
let editDate = document.getElementById("edit-task-date");
let editTimeInput = document.getElementById("edit-task-time-main");
let editTime = document.getElementById("edit-task-time");
let editInput = document.getElementById("edit-task-name");
let editSelectedDate = "";
let editButton = document.getElementById("edit_btn");
let taskCategory = document.getElementById("task-category");
let category = document.getElementById("catInput");
let catInput = document.getElementById("cInput");
let CatBtn = document.getElementById("catBtn");
let selectedCategory = document.getElementById("selectedCategory");
let selectedCat = "";
let index = count; // Use the current count of tasks as the index


categoryIcon.addEventListener('click', function() {
    // Toggle the display of taskCategory when categoryIcon is clicked
    if (taskCategory.style.display === "none") {
        taskCategory.style.display = "block";
    } else {
        taskCategory.style.display = "none";
    }    
});




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

// Function to handle category selection
function AddCat() {
    selectedCat = taskCategory.value;

    if (selectedCat === "Other") {
        // Show the custom category input if "Other" is selected
        category.style.display = "flex";
    } else {
        // Hide the custom category input for predefined categories
        category.style.display = "none";
        selectedCategory.innerText = " : " + selectedCat;
    }
    taskCategory.style.display = "none";
}

// Run the AddCat function when the category selection changes
taskCategory.addEventListener('change', AddCat);

// Handle the custom category button click
CatBtn.addEventListener("click", function() {
    category.style.display = "none";
    selectedCat = catInput.value.trim(); // Trim any extra spaces
    if (selectedCat) {
        selectedCategory.innerText = " : " + selectedCat;
        // console.log(selectedCat.length);
    } else {
        selectedCategory.innerText = ""; // Clear if input is empty
    }
    console.log(selectedCat.length);
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
    count = tasks.length;
    
    tasks.forEach(task => {
        let separator = (task.date && task.time) ? "<li>|</li>" : "";
        box.innerHTML += `
            <div class="taskss" data-category="${task.category}"  data-index="${task.index}">    
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
                        <li>
                            <p class="category">${task.category}</p>
                        </li>
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

     count++;
    box.style.display = count !== 0 ? "block" : "none";
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
    let tasks = [];
    document.querySelectorAll(".taskss").forEach(taskElement => {
        let indexx =  taskElement.getAttribute("data-index").textContent;
        let taskName = taskElement.querySelector(".task-name h4.date").textContent.trim();
        let taskDate = taskElement.querySelector(".task-name p.date")?.textContent.trim() || "";
        let taskTime = taskElement.querySelector(".task-name p.time")?.textContent.trim() || "";
        let category = taskElement.querySelector(".task-name p.category")?.textContent.trim() || "";
        let checked = taskElement.querySelector(".checked").style.display === "block";
        let important = taskElement.querySelector(".iimportant").style.display === "block";
        tasks.push({index: indexx, name: taskName, date: taskDate, time: taskTime, category: category, checked: checked, important: important });
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
// Event listener for time input change
reminderTimeInput.addEventListener("change", function() {
    selectedTime = this.value.replace("T", " ").split(" ");
    selectedTime[0] = selectedTime[0].split("-").reverse().join("-");
    selectedTime = selectedTime.join(" "); // Join the date and time back together
    selectedTimeDiv.innerHTML = `<p>${selectedTime}</p>`;
    selectedTimeDiv.style.display = "block";
    reminderTimeInput.style.display = 'none'; 
});










// Function to add a task
function addTask() {
    let inputValue = newTask.value.trim();
    let index = 0;
    
    if (!inputValue) return; // Exit if input is empty

    box.style.display = "block";

    // Create the HTML structure for the task
    box.innerHTML += `
        <div class="taskss" data-category="${selectedCat}"  data-index="${index}">    
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
                    ${(selectedDate && selectedTime) ? `<li>|</li>` : ''}
                    ${selectedTime ? `<li><p class="time">${selectedTime}</p></li>` : ''}
                    <li><p class="category">${selectedCat}</p></li>
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

    // Save tasks to local storage
    saveTasksToLocalStorage();

    // Update task count and visibility of the task box
    count++;
    box.style.display = count !== 0 ? "block" : "none";

    // Clear input and selected values
    newTask.value = "";
    selectedDate = "";
    selectedTime = "";
    selected.innerHTML = "";
    selectedTimeDiv.innerHTML = "";
    // selectedCat = "";
    btn.style.display = "none";
    index += 1;

    // Reload the page to reflect the new task addition
    location.reload();
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

// let categoryName = document.querySelector(".category");
// if (selectedCat.style.display === "block") {
//     importantIcon.style.display = "none";
//     notImportantIcon.style.display = "block";
// } else {
//     importantIcon.style.display = "block";
//     notImportantIcon.style.display = "none";
// }



function filterTasksByCategory(selectedCategory, showImportant) {
    const tasks = document.querySelectorAll('.taskss');
  
    tasks.forEach(task => {
      const taskCategory = task.getAttribute('data-category');
      const isImportant = task.querySelector('.iimportant').style.display === 'block';
  
      if (
        (selectedCategory === 'all' || taskCategory === selectedCategory) &&
        (showImportant === undefined || showImportant === isImportant)
      ) {
        task.style.display = 'flex';
      } else {
        task.style.display = 'none';
      }
    });
  }


// Handle task deletion
box.addEventListener("click", function(event) {
    if (event.target.closest(".delete-btn")) {
        let taskElement = event.target.closest(".taskss");
        if (confirm("Are you sure you want to delete this task?")) {
            taskElement.remove();
            count--;
            box.style.display = count !== 0 ? "block" : "none";
            saveTasksToLocalStorage();
        }
    }
});

// edit
// Listen for clicks on task elements to open the edit bar
let taskName = "";
let taskDate = "";
let taskTime = "";
let taskIndex = null;  // Add taskIndex to track the index of the task being edited
let editBar = document.getElementById("edit");
function openEditBar(taskElement) {
    editBar.style.display = "block";

    // Extract task details from the clicked task element
    taskName = taskElement.querySelector("h4.date").innerText;
    taskDate = taskElement.querySelector("p.date") ? taskElement.querySelector("p.date").innerText : "";
    taskTime = taskElement.querySelector(".time") ? taskElement.querySelector(".time").innerText : "";
    
    // Find the index of the task being edited
    taskIndex = Array.from(document.querySelectorAll(".taskss")).indexOf(taskElement);

    // Set the input fields with extracted values
    editDateInput.value = taskDate;
    editTimeInput.value = taskTime;
    editInput.value = taskName;
}





box.addEventListener("click", function(event) {
    // Check if the click happened inside a task element but not on buttons
    let taskElement = event.target.closest(".taskss");
    if (taskElement && !event.target.closest(".check-box-btn, .important-btn, .delete-btn")) {
        openEditBar(taskElement);  // Pass the task element to openEditBar
    }
});





// Show the date picker when the input is focused
editDateInput.addEventListener("focus", function() {
    editDate.style.display = "block";
});





// Update the input value when the date input loses focus
editDate.addEventListener("blur", function() {
    let editedStr = String(editDate.value);  // Convert the date to string
    let edited = editedStr.split("-").reverse().join("-");  // Reverse the date format (from YYYY-MM-DD to DD-MM-YYYY)
    editDateInput.value = edited;  // Set the reversed date as the input value
    editDate.style.display = "none";  // Hide the date picker after selection
});





// Show the time picker when the input is focused
editTimeInput.addEventListener("focus", function() {
    editTime.style.display = "block";
});





editTime.addEventListener("blur", function() {
    let edited = editTime.value.replace("T", " ").split(" ").map((e, i) => i === 0 ? e.split("-").reverse().join("-") : e).join(" ");
    editTimeInput.value = edited;  // Set the edited time as the input value
    editTime.style.display = "none";  // Hide the time picker after selection
});





function updateTask() {
    // Get the task list from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Check if the taskIndex is valid
    if (taskIndex !== null && taskIndex >= 0 && taskIndex < tasks.length) {
        // Update the task details using the input values
        tasks[taskIndex].name = editInput.value;
        tasks[taskIndex].date = editDateInput.value;
        tasks[taskIndex].time = editTimeInput.value;

        // Log the updated values for debugging (optional)
        console.log("Updated Task:", tasks[taskIndex]);

        // Save the updated tasks back to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Refresh the task display after updating
        displayTasks();

        // Optionally, close the edit bar after updating
        editBar.style.display = "none";
    } else {
        console.error("Invalid task index:", taskIndex);
    }
}





// Corrected the event listener to pass the function reference
editButton.addEventListener('click', updateTask);
function close() {
    editBar.style.display = "none";
}





let exitBtn = document.getElementById("ext_btn")
exitBtn.addEventListener('click', close);