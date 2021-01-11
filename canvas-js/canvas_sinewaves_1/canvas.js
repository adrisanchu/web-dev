const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

/*
// ==============================================
sine equation: f(x) = A * sin[ k * (x-b) ] + y = A * sin[kx + c]
where:
A: Amplitude
k: Periodicity factor (num onda) -> 2*PI/k = PERIOD
b: Horizontal Shift (left/right)
y: Vertical Shift (up/down)
// ==============================================
*/

const wave = {
    // initial parameters
    A: 250,                     // Amplitude
    k: 0.009,                    // Periodicity factor
    b: 0.01,                       // Horizontal Shift (left/right)
    y: canvas.height / 2,       // Vertical Shift (up/down)
    // optional parameters
    width: 5,
    color: '#A83B16'
};

c.fillRect(0, 0, canvas.width, canvas.height);

// initially set increment as b and then ++
let increment = wave.b;

function animate() {
    requestAnimationFrame(animate);

    let fillColor = `rgba(0,0,0,${Math.abs( Math.sin( increment* (Math.PI/2) ) ) * 0.04})`;
    c.fillStyle = fillColor;
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    // position on the left side, at the middle of the canvas
    c.moveTo(0, canvas.height / 2);

    for (let x = 0; x < canvas.width; x++) {
        // c.lineTo(x, canvas.height / 2);  // horizontal line, generating x values
        // c.lineTo(x, canvas.height / 2 + Math.sin(x * 0.01) * 100);
        c.lineTo(x, wave.y + Math.sin(increment) * (Math.sin(x * wave.k - increment) * wave.A));
    }
    // the choosen color
    c.strokeStyle = wave.color;
    c.lineWidth = wave.width;

    // draw the curve
    c.stroke();

    // increase b !
    increment += wave.b;
}

animate();