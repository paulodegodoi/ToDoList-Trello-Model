// Add New Task in To Do

function addNewList() {
    // document.querySelector('.list-items').createElement('div')
    const divList = document.createElement('div')
    divList.classList.add('list')
    
    const titleToDo = document.querySelector('#titleToDo').value

    const titleList = document.createElement('h2')
    titleList.innerHTML = titleToDo

    divList.appendChild(titleList)

    document.querySelector('.list-items').appendChild(divList)

    // Add function to drag item
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

const dropzones = document.querySelectorAll('[list-dropzone]')
dropzones.forEach(dropzone => {
    dropzone.ondragover = e => e.preventDefault()
    dropzone.ondrop = function(e) {
        const id = e.dataTransfer.getData('item-id')
        const item = document.getElementById(id)
        // e.target.appendChild(item)
        dropzone.appendChild(item)
    }
})

