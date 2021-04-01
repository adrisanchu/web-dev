const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

mongoose.connect('mongodb://localhost:27017/authDemo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
        console.log('Mongo connection open!!!');
    })
    .catch((err) => {
        console.log('Mongo connection error');
        console.log(err);
    })

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async(req, res) => {
    res.send(req.body);
});

app.get('/secret', (req, res) => {
    res.send('secret...');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});