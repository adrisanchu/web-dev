let exactText = '';

document.addEventListener('mouseup', event => {  
    if(window.getSelection().toString().length){
       exactText = window.getSelection().toString();        
    };
});

function format(command, value=null) {
    document.execCommand(command, false, value);
    console.log(`${exactText} is now ${command}!`);
}

function boldButton() {
    document.execCommand('bold', false, exactText);
    console.log(`${exactText} is now bold!`);
};
function italicButton() {
    document.execCommand('italic', false, exactText);
    console.log(`${exactText} is now italic!`);
};
// Text Editor functionalities

// Change font on selected text
function changeFont() {
    const Font = document.getElementById('input-font').value;
    document.execCommand('fontName', false, Font);
};
// Change size over selected text
function changeSize() {
    const size = document.getElementById('fontSize').value;
    document.execCommand('fontSize', false, size);
};



// why not to use...?
// const selection = window.getSelection();

// how to handle multiple modifications over the selection?
// it only applies the first one occurred...