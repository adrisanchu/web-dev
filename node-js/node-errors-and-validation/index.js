const express = require('express');
const app = express();

const AppError = require('./AppError');

// custom middleware (morgan clone)
app.use((req, res, next) => {
    // we add the property requestTime to req object
    req.requestTime = Date.now();
    // both .method and .path exist
    console.log(req.method, req.path);
    next();
});

// example of custom middleware by passing secret
const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    throw new AppError('password needed!', 401);
}

app.get('/', (req, res) => {
    res.send("Hello!");
});

app.get('/secret', verifyPassword, (req, res) => {
    res.send('I have no secrets for you !!!!');
});

// error example: 403 (Forbidden)
app.get('/admin', (req, res) => {
    throw new AppError('You are not an admin!', 403);
});

// error handling in asynchronous js
app.get('/async', async(req, res, next) => {
    // we have to wait ! so we need to pass the error
    // INSIDE next() !!
    let test = () => {
        // if bool is false, then error
        // if bool is true, ok !
        let bool = false;
        setTimeout(() => {
            // random nbr, 0 or 1
            rand = Math.floor(Math.random() * 2);
            console.log(`from await, r=${rand}`);
            if (rand === 1) {
                bool = false;
            } else {
                bool = true;
            }
            console.log(bool);
            // we fake an error happening
            if(!bool) {
                return next(new AppError('Async Err!', 404));
            }
            return res.send('I am coming from await !!');
        }, 3000);
    }
    console.log('coming out of async!');
    test();
});

// custom error handler, using our custom AppError class
app.use((err, req, res, next) => {
    // add up our class !
    // set default values in case there is undefined
    const { status = 500, message = 'Something went wrong :(' } = err;
    res.status(status).send(message);
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});