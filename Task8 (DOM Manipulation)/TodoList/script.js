
const addTask = document.getElementById('add-task')
const taskContainer = document.getElementById('task-container')
const inputTask = document.getElementById('input-task')


addTask.addEventListener('click', () => {
    // new task div created
    let task = document.createElement('div')
    task.classList.add('task')

    // new task div's text created
    let li = document.createElement('li')
    li.innerText = `${inputTask.value}`
    task.appendChild(li)

    // new task div's buttons created
    let checkButton = document.createElement("button")
    checkButton.innerHTML = "<i class='fa-solid fa-check'> </i>"
    checkButton.classList.add('checkTask')
    task.appendChild(checkButton)

    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "<i class='fa-solid fa-trash-can'> </i>"
    deleteButton.classList.add('deleteTask')
    task.appendChild(deleteButton)

    // new task div appened to the tasks container
    if(inputTask.value === ""){
        alert("Please enter a task")
    }else{
        taskContainer.appendChild(task)
    }

    //clearing input tag value
    inputTask.value = ""

    // event handlers for each task's buttons
    checkButton.addEventListener('click', () => {
        if(checkButton.getAttribute('class').includes("uncheckTask")){
            checkButton.parentElement.style.textDecoration = 'none'
            checkButton.innerHTML = "<i class='fa-solid fa-check'> </i>"
            checkButton.classList.remove('uncheckTask')
        }else{
            checkButton.parentElement.style.textDecoration = 'line-through'
            checkButton.innerHTML = "<i class='fa-solid fa-times'> </i>"
            checkButton.classList.add('uncheckTask')
            console.log(checkButton) 

        }
    })

    deleteButton.addEventListener('click', (e) => {
        let target = e.target;
        target.parentElement.parentElement.remove()
    })

    
})
