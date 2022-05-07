const getDatabase = () => JSON.parse(localStorage.getItem('todoList')) ?? []
const setDatabase = (database) => localStorage.setItem('todoList', JSON.stringify(database))
const database = getDatabase()

// Add New Task in To Do
const addNewTask = (task, index) => {

    const divList = document.createElement('div')
    divList.classList.add('list')
    divList.innerHTML = `
    <h2>${task}</h2>
    <input type="button" value="X" data-index=${index}></input>
    `

    document.querySelector('#tasksTodo').appendChild(divList)

    // Function to set drag to item
    const list = document.querySelectorAll('[list-dropzone] .list')
    function addDraggableToList() {
    list.forEach((item, index) => {
        item.draggable = true
        item.id = item.id || `draggable-item-${index}`
        item.ondragstart = e => e.dataTransfer.setData('item-id', e.target.id)
        })
    }
    addDraggableToList()
}

// Function to drag an item
const dropzones = document.querySelectorAll('[list-dropzone]')
dropzones.forEach(dropzone => {
    dropzone.ondragover = e => e.preventDefault()
    dropzone.ondrop = function(e) {
        const id = e.dataTransfer.getData('item-id')
        const item = document.getElementById(id)
        dropzone.appendChild(item)
        // removeItem()
        }
    })

const clearTasks = () => {
    const tasksTodo = document.getElementById('tasksTodo')
    while(tasksTodo.firstChild) {
        tasksTodo.removeChild(tasksTodo.lastChild)
    }
} 

const render = () => {
    clearTasks()
    database.forEach((item, index) => addNewTask(item.task, index))
}

const insertItem = (e) => {
    const titleTodo = document.querySelector('#titleTodo')
    console.log(e)
    if (e.type === 'click') {
        database.push({'task': titleTodo.value})
        setDatabase(database)
        render()
        titleTodo.value = ''
    }
}

const removeItem = (index) => {
    database.splice(index, 1)
    setDatabase(database)
    render()
}

const clickItem = (e) => {
    const element = e.target
    if (element.type === 'button') {
        const index = element.dataset.index
        removeItem(index)
    }
}

document.getElementById('addList').addEventListener('click', insertItem)
document.getElementById('todoContainer').addEventListener('click', clickItem)

render()


