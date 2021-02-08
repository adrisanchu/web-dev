const express = require('express');
const app = express();

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
    console.log('Home!');
    res.send('Welcome to my website');
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