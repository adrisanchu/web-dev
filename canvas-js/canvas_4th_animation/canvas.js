// Canvas ------------------
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c stands for "context"
// it is kind of a super object in js
var c = canvas.getContext('2d');
c.fillRect(0, 0, canvas.width, canvas.height);
// console.log(canvas);

// random colors:
// '#ffaa33', '#99ffaaa', '#00ff00', '#4411aa', '#ff1100'
// CONSTANT UA color palette:
/*
var colorArray = [
    '#E38771',
    '#A83B16',
    '#71E3C6',
    '#2D977C',
    '#28282D'
]
*/
// initialize color array like if we are in dark mode
var colorArray = [
    '#E38771',
    '#A83B16',
    '#71E3C6',
    '#2D977C',
    '#FFFFFF'
]

// Background Format
function setBackground(color) {
    switch (color) {
        case 'dark':
            document.documentElement.setAttribute('data-theme', 'dark');
            console.log('dark mode');
        break;

        case 'gray':
            document.documentElement.setAttribute('data-theme', 'gray');
            console.log('gray mode');
        break;

        case 'light':
            document.documentElement.setAttribute('data-theme', 'light');
            console.log('light mode');
        break;

        case 'random':
            document.documentElement.setAttribute('data-theme', 'random');
            console.log('random mode');
        break;
        
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function colorPalette(color) {
    switch(color) {
        case 'dark':
            colorArray = [
                '#E38771',
                '#A83B16',
                '#71E3C6',
                '#2D977C',
                '#FFFFFF'
            ]
            console.log('Dark palette');
        break;

        case 'gray':
            colorArray = [
                '#E38771',
                '#A83B16',
                '#71E3C6',
                '#2D977C',
                '#28282D'
            ]
        break;

        case 'light':
            colorArray = [
                '#E38771',
                '#A83B16',
                '#71E3C6',
                '#2D977C',
                '#28282D'
            ]
            console.log('Light palette');
        break;
        
        case 'random':
            // we choose 5 random colors by using getRandomColor
            for (var i = 0; i < 5; i++) {
                colorArray[i] = getRandomColor();
            }
            console.log('Random palette');
        break;
          
    }
}

// initialize mouse EventListener
var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', 
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

window.addEventListener('resize', 
    function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        init();
    }
);


var maxRadius = 30;
var minRadius = 2;

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    // we get a random color based on the length of the color array
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function() {
        // circle
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(){
            if ( (this.x + this.radius) > innerWidth ||
                (this.x - this.radius) < 0) {
                this.dx = -this.dx;
            }

            if ( (this.y + this.radius) > innerHeight||
                (this.y - this.radius) < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;
            
            // interactivity with the mouse
            if( Math.abs(mouse.x - this.x) < 50 &&
                Math.abs(mouse.y - this.y) < 50) {
                    if(this.radius < maxRadius) {
                        this.radius +=1;
                    }
                
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
            }
            this.draw();
    }
}

// initialize an array to store every circle
var circleArray = [];

// init function to trigger the creation of all circles
function init() {

    // initialize circleArray everytime we resize the size of the window
    circleArray = [];

    // we create 100 circles and store them inside circleArray
    for(var i = 0; i < 800; i++) {
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        var radius = 1 + (Math.random() * 4); // something between 1 and 5
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

// animate function to run forever
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(var i = 0; i < circleArray.length; i++) {
        //circle.update();
        // replaced by each of the circles inside of the array
        circleArray[i].update();
    }
}

// change color mode: dark, light, random, ...
var color = '';
function setMode(color) {
    setBackground(color);
    colorPalette(color);
    init();
}

init();
animate();