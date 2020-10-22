var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c stands for "context"
// it is kind of a super object in js
var c = canvas.getContext('2d');
c.fillRect(100, 100, 100, 100);
// console.log(canvas);

var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = 4;
var dy = 4;
var radius = 30;
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    // circle
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false);
    c.strokeStyle = "blue";
    c.stroke();
    if ( (x + radius) > innerWidth ||
         (x - radius) < 0){
        dx = -dx;
    }
    if ( (y + radius) > innerHeight||
         (y - radius) < 0){
        dy = -dy;
    }

    x += dx;
    y += dy;
}

animate();
