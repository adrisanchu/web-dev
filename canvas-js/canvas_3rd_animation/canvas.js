var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c stands for "context"
// it is kind of a super object in js
var c = canvas.getContext('2d');
c.fillRect(100, 100, 100, 100);
// console.log(canvas);

// initialize mouse EventListener
var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 30;
var minRadius = 2;

// define the different colors
// random colors:
// '#ffaa33', '#99ffaaa', '#00ff00', '#4411aa', '#ff1100'
// CONSTANT UA color palette:
var colorArray = [
    '#E38771',
    '#A83B16',
    '#71E3C6',
    '#2D977C',
    '#28282D'
]

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

function Circle(x, y, dx, dy, radius, minRadius){
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
        // stroke style ----
        //c.strokeStyle = "blue";
        //c.stroke();
        // fill style ----
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(){
            if ( (this.x + this.radius) > innerWidth ||
                (this.x - this.radius) < 0){
                this.dx = -this.dx;
            }

            if ( (this.y + this.radius) > innerHeight||
                (this.y - this.radius) < 0){
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
                
            } else if (this.radius > this.minRadius){
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
    for(var i = 0; i < 800; i++){
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

    for(var i = 0; i < circleArray.length; i++){
        //circle.update();
        // replaced by each of the circles inside of the array
        circleArray[i].update();
    }

} 

init();
animate();
