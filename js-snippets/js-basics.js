// Numbers & Booleans:
// -------------------------

// Numbers:
1;
-99;
0.345345;

//Making variables with let:
let numberOfFriends = 1; // 'var' is deprecated, now we use 'let' instead

//Incrementing:
numberOfFriends += 3; //numberOfFriends is now 4

// Variables with const
const minimumAge = 21; //CANNOT REASSIGN!
minimumAge++;  // this throws an error !!
minimumAge = 80;  // and this also !!


//Booleans - true or false values
true;
false;
let isHappy = true;
// Not True or False like in Python !!


//Naming Conventions
// Use upper camel-cased names:
let numberOfChickens = 6; //GOOD
// NOT THE JS WAY:
let number_of_chickens = 6; // so pythonic...

// ==============================

// Strings:
// -------------------------

// Making Strings
let color = "purple";

// Single quotes work too:
let city = 'Tokyo';

//Strings have a length:
city.length; //5

//We can access specific characters using their index:
city[0]; //'T'
city[3]; //'y'

// String methods:
'hello'.toUpperCase(); // "HELLO";
'LOL'.toLowerCase(); // "lol"
'    omg  '.trim(); // "omg"

// String methods with arguments:
// ==============================

//indexOf returns the index where the character is found (or -1 if not found)
'spider'.indexOf('i'); //2
'vesuvius'.indexOf('u'); //3 - only returns FIRST matching index
'cactus'.indexOf('z'); //-1 not found

// slice - returns a "slice" of a string
"pancake".slice(3); //"cake" - slice from index 3 onwards
"pancake".slice(0, 3); //"pan" - slice from index 0 up to index 3

// replace - returns a new string, with the FIRST match replaced
"pump".replace("p", "b"); //"bump" - only replaces first "p"

// String Template Literals
// Use backtick characters, NOT SINGLE QUOTES!
// ========================
const color = "olive green";
const msg = `My favorite color is: ${color}` //"My favorite color is: olive green"

const str = `There are ${60 * 60 * 24} seconds in a day`//"There are 86400 seconds in a day"

// Object literals:
// -------------------------

// To make an object literal:
const dog = {
    name: "Rusty",
    breed: "unknown",
    isAlive: false,
    age: 7
}
// All keys will be turned into strings!

// To retrieve a value:
dog.age; //7
dog["age"]; //7

//updating values
dog.breed = "mutt";
dog["age"] = 8;


// Conditionals and logical operators:
// -------------------------

// =====================
// LOGICAL AND OPERATOR
// =====================
const password = prompt("Enter your password");
if (password.length >= 6 && password.indexOf(' ') === -1) {
    console.log("VALID PASSWORD!")
} else {
    console.log("INCORRECT FORMAT FOR PASSWORD!")
}

// =====================
// AGE EXAMPLE
// =====================

// 0-5 free 
// 5-10 $10 
// 10-65 $20
// 65+ free

const age = 100;
if ((age >= 0 && age < 5) || age >= 65) {
    console.log("FREE");
} else if (age >= 5 && age < 10) {
    console.log("$10")
} else if (age >= 10 && age < 65) {
    console.log("$20")
} else {
    console.log("INVALID AGE!")
}

// let firstName = prompt("enter your first name");
// if (!firstName) {
//     firstName = prompt("TRY AGAIN!!!");
// }

// =====================
// COMBINING && and ||
// =====================
const age = 8;
if (!(age >= 0 && age < 5 || age >= 65)) {
    console.log("YOU ARE NOT A BABY OR A SENIOR!")
}

// Arrays:
// -------------------------
// (to complete)

// Loops:
// -------------------------

// Sample array
const seatingChart = [
    ['Kristen', 'Erik', 'Namita'],
    ['Geoffrey', 'Juanita', 'Antonio', 'Kevin'],
    ['Yuma', 'Sakura', 'Jack', 'Erika']
]

// =====================
// FOR LOOP
// =====================

console.log('For Loop ---');
for (let i = 0; i < seatingChart.length; i++) {
    const row = seatingChart[i];
    for (let j = 0; j < row.length; j++) {
        console.log(row[j])
    }
}

// =====================
// FOR OF LOOP
// (new, not supported in IE)
// only works with arrays
// =====================

console.log('For Of Loop ---');
for (let row of seatingChart) {
    for (let student of row) {
        console.log(student);
    }
}

// sample object
const testScores = {
    keenan: 80,
    damon: 67,
    kim: 89,
    shawn: 91,
    marlon: 72,
    dwayne: 77,
    nadia: 83,
    elvira: 97,
    diedre: 81,
    vonnie: 60
}

// =====================
// FOR IN LOOP
// (to iterate an object!)
// It's like in Python
// =====================

for (let person in testScores) {
    console.log(`${person} scored ${testScores[person]}`);
}

// ==============================================
// Another option is to transform objects into arrays
// Using Object methods to iterate
// (turn data into an array and then use for...of)
// ==============================================

let total = 0;
let scores = Object.values(testScores);
for (let score of scores) {
    total += score;
}
console.log(total / scores.length);

// =====================
// WHILE LOOP
// (when we don't know the number of iterations)
// =====================

const SECRET = "BabyHippo";

let guess = prompt("enter the secret code...");
while (guess !== SECRET) {
    guess = prompt("enter the secret code...");
}
console.log("CONGRATS YOU GOT THE SECRET!!!");


// Functions:
// -------------------------

// 1. Simple functions:

function add(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        return false;
    }
    return x + y;
}

// 2. Function Expressions:
// assign a function to a variable

const add = function (x, y) {
    return x + y;
}

// 3. Higher Order Functions:

function callTwice(func) {
    func();
    func();
}

function callTenTimes(f) {
    for (let i = 0; i < 10; i++) {
        f();
    }
}

function rollDie() {
    const roll = Math.floor(Math.random() * 6) + 1;
    console.log(roll);
}

callTwice(rollDie);
// Here, rollDie goes without parenthesis!
// We do not want to execute the function, but to pass it as an argument!


// Methods:
// -------------------------

// Classical sintax used:

const myMath = {
    PI: 3.14159,
    square: function(num) {
        return num * num;
    },
    cube: function(num) {
        return num ** 3;
    }
}

// Shorthand sintax used:
// (function keyword is omitted)
// const obj = { func1(arg){},func2(arg1, arg2){} }

const myMath = {
    PI: 3.14159,
    square(num) {
        return num * num;
    },
    cube(num) {
        return num ** 3;
    }
}

// the 'this' keyword is used to reference some property
// that exists in an object while we're inside a method.
// for example:
// In the 'cat' object, we reference the 'name' property inside the 'meow()' method

const cat = {
    name: 'Blue Steele',
    color: 'grey',
    breed: 'scottish fold',
    meow() {
        console.log("THIS IS:", this)
        console.log(`${this.name} says MEOWWWW`);
    }
}

// however, when called in this way, we cannot capture the name property!
// It is important to pay attention to the INVOKATION CONTEXT for the word 'this' !!
const meow2 = cat.meow;


// Callback Methods:
// -------------------------

// =====================
// ARRAY FUNCTIONS
// =====================

// We can write the same function in 2 ways:
// the classic way, or the arrow function way

// Function 'add' in different versions, all valid:
// Old way
const add = function(x,y) {
    return x + y;
}
// Omit function keyword
const add = (x, y) => {
    return x + y;
}
// Omit return keyword and curly braces
const add = (a, b) => a + b;

// IMPORTANT! ARROW FUNCTIONS SHALL BE USED CAREFULLY IN OBJECTS!

const person = {
    firstName: 'Viggo',
    lastName: 'Mortensen',
    fullName: function () {
        return `${this.firstName} ${this.lastName}`
    },
    shoutName: function () {
        setTimeout(() => {
            //keyword 'this' in arrow functions refers to the value of 'this' when the function is created
            console.log(this);
            console.log(this.fullName())
        }, 3000)
    }
}

// =====================
// ForEach, FILTER, MAP, REDUCE, SOME&EVERY METHODS
// These methods require a callback function inside
// =====================

// Sample data

const movies = [
    {
        title: 'Amadeus',
        score: 99,
        year: 1984
    },
    {
        title: 'Sharknado',
        score: 35,
        year: 2013
    },
    {
        title: '13 Going On 30',
        score: 70,
        year: 2004
    },
    {
        title: 'Stand By Me',
        score: 85,
        year: 1986
    },
    {
        title: 'Waterworld',
        score: 62,
        year: 1995
    },
    {
        title: 'Jingle All The Way',
        score: 71,
        year: 1996
    },
    {
        title: 'Parasite',
        score: 95,
        year: 2019
    },
    {
        title: 'Notting Hill',
        score: 77,
        year: 1999
    },
    {
        title: 'Alien',
        score: 90,
        year: 1979
    }
]

// forEach: The old way before for...of
// We can iterate for each element inside an object
movies.forEach(function (movie) {
    console.log(`${movie.title} - ${movie.score}/100`)
})

// Filter: Returns the values that pass the filter criteria
// Ex: Return movies (the object!) released after 2000
const recentMovies = movies.filter(m => m.year > 2000)

// Map: Creates a new array by evaluating a expression to each value inside the array
// We frequently use filter and map together
// Ex: Return AN ARRAY OF TITLES with score higher than 80
const highScoreMoviesTitles = movies.filter(m => m.score > 80).map(m => m.title);

// IMPLICIT RETURN:
// We can use implicit return omitting the return keyword and curly braces
// This only works when the function is constituted by a single line of code!!
const newMovies = movies.map(movie => (
    `${movie.title} - ${movie.score / 10}`
))

// Reduce: it lets you store a value and roll-up
// Useful for cumulate totals and stuff like that

// Sample data
const prices = [9.99, 1.50, 19.99, 49.99, 30.50];

// We can calculate the sum of all prices with a for loop
let total = 0;
for (let price of prices) {
    total += price
}
console.log(total)

// But we get the same result by using 'reduce'
// 1st arg: stores the result from previous iteration
// 2nd arg: each element of the array
const total = prices.reduce((total, price) => {
    return total + price
})

// Even shorter sintax
const total = prices.reduce((total, price) => total + price)

// Other use: We get the minimum price among all those,
// by storing the min price on each iteration and finally
// returning the last value stored
const minPrice = prices.reduce((min, price) => {
    if (price < min) {
        return price;
    }
    return min;
})

// SOME & EVERY
// Returns true or false depending on the evaluation of a condition
// for each value inside an array

const exams = [80, 98, 92, 78, 77, 90, 89, 84, 81, 77]
// 'every' returns true if all fields in the array pass the condition
exams.every(score => score >= 75)  // returns true
// 'some' returns true if ONE OR MORE fields pass the condition
exams.some(score => score < 75)  // returns false
exams.some(score => score = 77)  // returns true

// setTimeout
// Executes a function after a time delay, in ms!
console.log("HELLO!!!...")
setTimeout(() => {
    console.log("...are you still there?")
}, 3000)
// The message "...are you still there?"
// runs 3 seconds (3000ms) after!


// JSON data:
// -------------------------

//THIS IS A STRING OF JSON (NOT AN OBJECT)
const data = `{"ticker":{"base":"BTC","target":"USD","price":"11288.49813464","volume":"91769.69699773","change":"-46.29462447"},"timestamp":1596510482,"success":true,"error":""}`

// THIS IS A JS OBJECT
const parsedData = JSON.parse(data);



// Requests - Responses:
// -------------------------

// =====================
// The old way: XHR
// =====================
const req = new XMLHttpRequest();

req.onload = function () {
    console.log("ALL DONE WITH REQUEST!!!")
    const data = JSON.parse(this.responseText);
    console.log(data.ticker.price);
}

req.onerror = function () {
    console.log("ERROR!!!")
    console.log(this);
}

req.open('GET', 'https://api.cryptonator.com/api/ticker/btc-usd')
req.send();

// =====================
// Using the Fetch API with fetch .then and .catch
// =====================

// the simple way
fetch('https://api.cryptonator.com/api/ticker/btc-usd')
    .then(res => {
        console.log("RESPONSE, WAITING TO PARSE...", res)
        return res.json()
    })
    .then(data => {
        console.log("DATA PARSED...")
        console.log(data.ticker.price)
    })
    // we pass only one .catch if something goes wrong
    .catch(e => {
        console.log("OH NO! ERROR!", e)
    })

// using asynchronous JS: async and await
// it is less code
// we need to use try {await ... } catch(error){} to catch errors
const fetchBitcoinPrice = async () => {
    try {
        const res = await fetch('https://api.cryptonator.com/api/ticker/btc-usd');
        const data = await res.json();
        console.log(data.ticker.price)
    } catch (e) {
        console.log("SOMETHING WENT WRONG!!!", e)
    }
}

// =====================
// Using AXIOS library
// kind of the same that Fetch API but shorter
// =====================

// IMPORTANT! We need to import this in our index.html
// <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

// the equivalent of the first request using fetch API, but with AXIOS
axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
    .then(res => {
        console.log(res.data.ticker.price)
    })
    .catch(err => {
        console.log("ERROR!", err)
    })

// the equivalent of the second request using async await, but with AXIOS
const fetchBitcoinPrice = async () => {
    try {
        const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
        console.log(res.data.ticker.price)
    } catch (e) {
        console.log("ERROR!", e)
    }
}

// Setting headers with AXIOS
// When doing a request, we can configure the headers of our request like in this example
const getDadJoke = async () => {
    try {
        const config = { headers: { Accept: 'application/json' } }
        const res = await axios.get('https://icanhazdadjoke.com/', config)
        return res.data.joke;
    } catch (e) {
        return "NO JOKES AVAILABLE! SORRY :("
    }

}

// Another example with AXIOS
// EXAMPLE
// =====================
const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    // get input text after submit
    const searchTerm = form.elements.query.value;
    // we build our request like this: http://api.tvmaze.com/search/shows?q={searchTerm}
    const config = { params: { q: searchTerm } }
    // for multiple params we separate with commas 
    // params: { q: searchTerm, country: US }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    // we will extract the image from show > image > medium
    // example: res.data[0].show.image.medium
    makeImages(res.data)
    // clean-up input field
    form.elements.query.value = '';
})

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {  // check if the image key exists in the response
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            document.body.append(img)
        }
    }
}
// =====================