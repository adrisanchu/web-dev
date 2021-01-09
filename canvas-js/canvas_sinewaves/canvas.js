const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// console.log('canvas');

// Define a straight horizontal line (our reference -x- axis)
// c.beginPath();

/*
// ==============================================
sine equation: f(x) = A * sin[ k * (x-b) ] + y
where:
A: Amplitude
k: Periodicity factor -> 2*PI/k = PERIOD
b: Horizontal Shift (left/right)
y: Vertical Shift (up/down)
// ==============================================
*/

// Constructor: Wave object
function Wave(A, k, b, y, width = 1, color = '#000000') {
    this.A = A;                     // Amplitude
    this.k = k;                     // Periodicity factor
    this.b = b;                     // Horizontal Shift (left/right)
    this.y = y;                     // Vertical Shift (up/down)
    this.width = width;             // Line Width
    this.color = color;             // Color

    // the sine equation
    this.equation = function (x) {
        // return (this.A * Math.sin(this.k * (x - this.b)) + this.y);
        return (Math.sin(this.i) * this.A * Math.sin(this.k * (x - this.b)) + this.y);
    }
    // wave effect
    this.waveEffect = function (x, i) {  // being i an incremental number
        return (Math.sin(i) * this.A * Math.sin(this.k * (x - this.b)) + this.y);
    }

    // draw a sine, from left to right
    this.draw = function () {
        c.beginPath();
        // position on the left side, at the middle of the canvas
        c.moveTo(0, canvas.height / 2);
        // loop runs for each pixel in the x axis
        for (let x = 0; x < canvas.width; x++) {
            // c.lineTo(x, canvas.height / 2);  // horizontal line, generating x values
            // c.lineTo(x, canvas.height / 2 + Math.sin(x * 0.01) * 100);
            c.lineTo(x, this.equation(x));
            // the choosen color
            c.strokeStyle = this.color;
            c.lineWidth = 10;
        }
        // Draw the line
        c.stroke();
    }
    this.drawWave = function (i) {
        // loop runs for each pixel in the x axis
        for (let x = 0; x < canvas.width; x++) {
            // c.lineTo(x, canvas.height / 2);  // horizontal line, generating x values
            // c.lineTo(x, canvas.height / 2 + Math.sin(x * 0.01) * 100);
            c.lineTo(x, this.waveEffect(x, i));
            // the choosen color
            c.strokeStyle = this.color;
            c.lineWidth = 10;
        }
        // Draw the line
        c.stroke();
    }

    this.update = function () {
        //movement along x axis by varying b
        this.b += 1;
        // this.k = Math.floor(Math.random() * 0.1) + 0.004;
        // this.k = Math.sin(this.b) * 0.01;
        this.draw();
    }

    this.updateWave = function (i) {
        //movement along x axis by varying b
        this.b += 1;
        // this.k = Math.floor(Math.random() * 0.1) + 0.004;
        // this.k = Math.sin(this.b) * 0.01;
        this.drawWave(i);
    }
}

// set initial parameters
let A = 300;
let k = 0.01;
let b = 0;
let y = canvas.height / 2;
let width = 5;
let color = '#A83B16';

// create a wave object
const wave = new Wave(A, k, b, y, width, color);

// draw a wave
// wave.draw();


let direction = 0; // from -1 to 1
let fillColor = 'rgba(0,0,0,0.01)';
c.fillRect(0, 0, canvas.width, canvas.height);

let increment = 0;

function animate() {
    c.fillStyle = fillColor;
    requestAnimationFrame(animate);
    c.fillRect(0, 0, canvas.width, canvas.height);
    wave.updateWave(increment);
    increment += 0.001;
}

/*
function animate() {
    if (direction >= 0 && direction < 1) {  // positive
        console.log('positive!');
        fillColor = `rgba(0,0,0,${direction * 0.04})`;
        direction += 0.01;
    } else if (direction < 0) {
        console.log('negative!');
        fillColor = `rgba(0,0,0,${-direction * 0.04})`;
        direction += 0.01;
    } else if (direction = 1) {  // reverse
        // console.log('change!');
        fillColor = `rgba(0,0,0,${direction * 0.04})`;
        direction = -direction;
    }
    c.fillStyle = fillColor;
    requestAnimationFrame(animate);
    c.fillRect(0, 0, canvas.width, canvas.height);
    wave.update();

}
*/
animate();