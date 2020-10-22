var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c stands for "context"
// it is kind of a super object in js
var c = canvas.getContext('2d');
c.fillRect(100, 100, 100, 100);
// console.log(canvas);

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function() {
        // circle
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "blue";
        c.stroke();
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

            this.draw();
    }
}

// initialize an array to store every circle
var circleArray = [];

// we create 100 circles and store them inside circleArray
for(var i = 0; i < 100; i++){
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    var radius = 30;
    circleArray.push(new Circle(x, y, dx, dy, radius));
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

animate();
