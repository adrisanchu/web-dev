var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c stands for "context"
// it is kind of a super object in js
var c = canvas.getContext('2d');
// Rectangle:
// c.fillRect(x, y, width, height);  
//c.fillStyle applies to the objects coming right after !
c.fillStyle = 'rgba(0, 255, 0, 0.5)';
c.fillRect(100, 100, 100, 100);
c.fillStyle = 'rgba(255, 0, 0, 0.5)';
c.fillRect(400, 100, 100, 100);
c.fillRect(300, 300, 100, 100);
console.log(canvas);

/* Line:
c.beginPath();
c.moveTo(x, y);
c.lineTo(x, y);
c.stroke();
*/
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = "blue";
c.stroke();

/* Arc / Circle
c.arc(x, y, radius, startAngle, endAngle, anticlockwise);
*/
// We use beginPath to separate the lines from other objects !
c.beginPath();
c.arc(300, 300, 30, 0, Math.PI * 2, false);
c.strokeStyle = "magenta";
c.stroke();

for (var i = 0; i < 50; i++) {
    // returning random x, y inside interval [0,1]
    // we multiply by the max width and height
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = "magenta";
    c.stroke();
}

// Animations:
var x = 200;