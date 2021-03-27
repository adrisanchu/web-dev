const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// use cookieParser as a middleware
app.use(cookieParser());

// use req.cookies to access the cookie object
app.get('/greet', (req, res) => {
    const { name = 'No-name' } = req.cookies;
    res.send(`Hey there, ${name}`);
});

app.get('/setname', (req, res) => {
    res.cookie('name', 'Adri Sanchez');
    res.send('sending cookie');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
