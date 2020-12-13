// Controls the start of the drag event
function onDragStart(event) {
    const id = event.target.id;
    console.log('I am the card: ' + id);
    // get initial background color of the element
    // const elem = document.getElementById(id);
    // assign a color to initColor
    // initColor = window.getComputedStyle(elem).backgroundColor;

    event.dataTransfer.setData('text/plain', event.target.id);
    // change background color of the dragged object
    // event.currentTarget.style.backgroundColor = 'yellow';
}

// Controls what happens when the dragging is over
function onDragOver(event) {
    console.log('I am over something!');
    event.preventDefault();
}

function onDrop(event) {
    event.preventDefault();
    // get the id by checking in the getData object
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    console.log('draggable Element: ' + draggableElement);

    const dropzone = event.target;  // card, or list, ...
    dropzone.appendChild(draggableElement);
    event.dataTransfer.clearData();
}