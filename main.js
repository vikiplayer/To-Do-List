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
                        <i class="fa-regular fa-circle"></i>
                    </button>
                </div>
                <div class="task-name">
                ${newTask.value}
                </div>
                <div class="important">
                    <button class="important-btn">
                        <i class="fa-solid fa-star iimportant"></i>
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
        alert("Please Enter a Task")
    }
    let tasks = document.querySelectorAll(".taskss");
    count = tasks.length;
    if (count != 0) {
        box.style.display = "block";
    }
    return count;    
}

// enter key funtion

btn.addEventListener("click",addTask);
newTask.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

box.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")){
        let task = event.target.closest(".taskss");
        task.remove();
        count = count - 1;
        if (count == 0) {
            box.style.display = "none";
        }
    }
});

let imp = document.getElementsByClassName("important-btn");
let ni = document.getElementsByClassName("not-important");
let im = document.getElementsByClassName("iimportant");
imp.addEventListener("click", function(event){
    im.style.display = "block";
    ni.style.display = "none";
})