let newTask = document.getElementById("add");
let addBtn = document.getElementById("add_btn");
let radioBtn = document.getElementById("radio_btn");
let btn = document.getElementById("push");
let box = document.getElementById("task-sec")
let count = 0;

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
                    ${newTask.value}
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
        
    }
});
