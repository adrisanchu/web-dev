const express = require('express');
const app = express();
const path = require('path');

// setup ejs for templating HTML (requires installation of ejs on npm)
app.set('view engine', 'ejs');
// __dirname gets the path where our index.js file lives
app.set('views', path.join(__dirname, '/views'));

/*
// everytime a request hits our server, app.use executes
app.use((req, res) => {
    // req: request | res: response
    console.log('new request received');
    res.send('<h1>hello!</h1>');
})  
*/
// / => main page

app.get('/', (req, res) => {
    // console.log('Home!');
    res.render('home.ejs');
})

// dynamic request using parameters with ':'
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    console.log('Subreddit request!');
    res.send(`<h1>Browsing the ${subreddit} subreddit`);
})

// request with query parameters: we catch them with req.query
app.get('/search', (req, res) => {
    console.log('Search request!');
    const { q, w, a, isita } = req.query;
    res.send(`<h1>Browsing query parameters: q: ${q}, w: ${w}, a: ${a}, isita: ${isita} </h1>`);
})

// /cats => 'meow'
// /dogs => 'woof'

app.get('/cats', (req, res) => {
    console.log('Cat request!');
    res.send('meow');
})

app.get('/dogs', (req, res) => {
    console.log('Dog request!');
    res.send('guau');
})

// '*' is a generic path to match everything else
// to pass at the very end !!
app.get('*', (req, res) => {
    res.send('unknown path');
})

// the server is setup on localhost:3000
app.listen(3000, () => {
    console.log('listening on port 3000');
});