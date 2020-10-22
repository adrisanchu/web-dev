window.addEventListener('load', () => {
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');

    // Resizing
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // variables
    let painting = false;
    var lineWidth = 6;
    var lineCap = 'round';

    function startPosition(e) {
        painting = true;
        draw(e);
    }
    function finishedPosition() {
        painting = false;
        c.beginPath();
    }
    function draw(e) {
        if(!painting) return;
        c.lineWidth = lineWidth;
        c.lineCap = lineCap;
        c.lineTo(e.clientX, e.clientY);
        c.stroke();
        c.beginPath();
        c.moveTo(e.clientX, e.clientY);
    }
    // EventListeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
});


