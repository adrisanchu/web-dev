const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

const sessionOptions = {
    secret: 'thisisnotagoodsecret',
    // these are settings for removing warnings.
    // see the docs about Express session
    resave: false,
    saveUnitialized: false
};

// pass settings to our session as a middleware
app.use(session(sessionOptions));

// using session object from req !
app.get('/viewcount', (req, res) => {
    if(req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    };
    res.send(`you have seen this page ${req.session.count} times`);
});

// another example working with req.session
app.get('/register', (req, res) => {
    const { username = 'Anonymous' } = req.query;
    req.session.username = username;
    res.redirect('/greet2');
});

app.get('/greet2', (req, res) => {
    const { username } = req.session;
    res.send(`Hello, ${username}`);
});

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
