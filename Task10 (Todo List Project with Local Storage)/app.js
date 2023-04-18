//DOM Elements

const todoform = document.getElementById("todo-form");
const todosContainer = document.getElementById("items-container");
const totalTasks = document.getElementById("total-tasks");
const remainingTasks = document.getElementById("remaining-tasks");
const completedTasks = document.getElementById("completed-tasks");
const mainInput = document.querySelector("#todo-form input");

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

$('document').ready(()=> {
    if (localStorage.getItem('tasks')){
        tasks.map((task) =>  createTask(task))
    }
})

todoform.addEventListener('submit', (e) => {
    e.preventDefault()

    const inputValue = mainInput.value
    if(inputValue==''){
        return
    }

    const task = {
        id: new Date().getTime(),
        name: inputValue,
        isCompleted: false
    }

    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))

    createTask(task)

    todoform.reset()
    mainInput.focus()
})

$('body').on('click', '.delete-btn', (e) => {
    const taskid = e.target.closest('.item-card').id
    removeTask(taskid)
})

todosContainer.addEventListener('input', (e) => {
    const taskid = e.target.closest('.item-card').id

    updateTask(taskid, e.target)
})


const countTasks = () => {
    const completedTasksArray = tasks.filter((task) => task.isCompleted === true)

    totalTasks.textContent = tasks.length
    completedTasks.textContent = completedTasksArray.length
    remainingTasks.textContent = (tasks.length - completedTasksArray.length)
}

const createTask = (task) => {
    const taskElement = document.createElement('div')
    taskElement.setAttribute('id', task.id)
    taskElement.classList.add('item-card')
    taskElement.classList.add('container')

    if(task.isCompleted){
        taskElement.classList.add('checked-item')
    }

    const taskElementMarkup = `
    <span class="item">
        <input type="checkbox" name="tasks" ${task.isCompleted? 'checked': ''} multiline={false}/>
        <span class="text" ${task.isCompleted? '': 'contenteditable'}>${task.name}</span>
    </span>
    <button type="submit" class="delete-btn"><i class="fa fa-times"></i></button>
    `
    taskElement.innerHTML = taskElementMarkup
    todosContainer.appendChild(taskElement)

    countTasks()
};

const removeTask = (taskid) => {
    tasks = tasks.filter( (task) => task.id !== parseInt(taskid))
    console.log(tasks)

    localStorage.setItem('tasks', JSON.stringify(tasks))

    document.getElementById(taskid).remove()
    countTasks()
}

const updateTask = (taskid, taskElement) => {
    const task = tasks.find((task) => task.id === parseInt(taskid))

    if(taskElement.hasAttribute('contenteditable')){
        task.name = taskElement.textContent
    }
    else{
        const taskText = taskElement.nextElementSibling
        const taskContainer = taskElement.closest('.item-card')

        task.isCompleted = !task.isCompleted;

        if(task.isCompleted) {
            taskText.removeAttribute('contenteditable')
            taskContainer.classList.add('checked-item')
        }
        else{
            taskText.setAttribute('contenteditable', true)
            taskContainer.classList.remove('checked-item')
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))
        countTasks()
}

