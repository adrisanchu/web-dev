const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// use cookieParser as a middleware
// (optional) pass a secret string
app.use(cookieParser('thisismysecret'));

// use req.cookies to access the cookie object
app.get('/greet', (req, res) => {
    const { name = 'No-name' } = req.cookies;
    res.send(`Hey there, ${name}`);
});

app.get('/setname', (req, res) => {
    res.cookie('name', 'Adri Sanchez');
    res.send('sending cookie');
});

// signed cookie
app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true });
    res.send('fruit cookie signed');
});

app.get('/verifyfruit', (req, res) => {
    res.send(req.cookies);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
