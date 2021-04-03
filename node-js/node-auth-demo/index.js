const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');

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

app.get('/', (req, res) => {
    res.send('this is the home page');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async(req, res) => {
    // destructure body data from form
    const { password, username } = req.body;
    // use bcrypt to hash our password
    const hash = await bcrypt.hash(password, 12);
    // save user data into MongoDB
    const user = new User({
        username,
        password: hash
    });
    await user.save();
    res.redirect('/');
});

app.get('/secret', (req, res) => {
    res.send('secret...');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async(req, res) => {
    const { password, username } = req.body;
    const user = await User.findOne({ username: username });
    const validPassword = await bcrypt.compare(password, user.password);
    if(validPassword){
        res.send('Welcome!');
    } else {
        res.send('try again');
    }
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});