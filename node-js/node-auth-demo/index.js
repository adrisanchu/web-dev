const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');

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
app.use(session({secret: 'notagoodsecret'}));

// function used as middleware to verify session id
const requireLogin = (req, res, next) => {
    if(!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
};

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
    // add user_id to session, equals to Mongo _id !
    req.session.user_id = user._id;
    res.redirect('/');
});

app.post('/logout', (req, res) => {
    // remove session id
    req.session.user_id = null;
    res.redirect('/login');
});

// we use middleware for user's id verification
app.get('/secret', requireLogin, (req, res) => {
    res.render('secret');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async(req, res) => {
    const { password, username } = req.body;
    // static method to validate user, created on the mongoose model
    const foundUser = await User.findAndValidate(username, password);
    if(foundUser){
        // add user_id to session, equals to Mongo _id !
        req.session.user_id = foundUser._id;
        res.redirect('/secret');
    } else {
        res.redirect('/login');
    }
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});