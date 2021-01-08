// METHOD 1:
// Object Literal
// Used when there are no methods involved, only properties !
// Or, when we only have one object
const circle = {
    radius: 1, // this is a property
    location: { // this is also a property, with two sub-properties
        x: 1,
        y: 1
    },
    draw: function(){ //this is a method
        console.log('draw');
    }
};

// circle.draw(); // We execute the draw() function !

// When we have multiple objects (here, multiple circles),
// factory functions are better than object literals

// ============================

// METHOD 2:
// Factory Function
// It requires to return the object created -> 'return' keyword
function createCircle(radius) {
    return {
        radius: radius,
        draw: function() {
            console.log('draw');
        }
    };
}

// const circle = createCircle(1); // We store the function in a variable
// circle.draw(); // this will draw a circle

// ============================

// METHOD 3:
// Constructor Function
// No return needed ! We use 'new' when running the constructor later !
function Circle(radius)  {
    this.radius = radius;
    this.draw = function() {
        console.log('draw');
    }
}

// IMPORTANT: 'new' keyword
const newCircle = new Circle(1); // Same as in the last method
newCircle.draw(); // this will draw a circle

/* The 'new' operator:
1. Creates an empty object {}
2. It will set the keyword 'this' to point to the new object {}
3. It will return that object from the 'Circle' function 
("return this;" happens automatically!)
*/

// ============================

// ITERATE THROUGH A CONSTRUCTOR
// We can iterate a constructor by its key-value pairs:
console.log('key-value pairs of newCircle: ');
for (let key in newCircle) {
    console.log(`key: ${key}, value: ${newCircle[key]}`);
}

// Approach 2: By using Object.keys
// this stores the keys inside an array
const keys = Object.keys(newCircle);
console.log(keys);

// ============================

// Limiting the access: public and private methods

// Consider this new object constructor:
function SquarePublicMethods(length) {
    this.length = length;
    this.area = length**2;
    this.perimeter = length*4;
    // default properties to draw a square
    this.defaultWidthLine = 1;
    this.defaultTypeLine = 'solid';
    this.defaultLocation = {x: 0, y: 0};
    // changed properties depending on parameters/criteria/whatever...
    this.widthLine = function(){
        //...
    }
    this.typeLine = function(){
        //...
    }
    this.location = function(){
        //...
    }
    // a method in which we use the altered properties
    this.draw = function() {
        //...
        this.location();
        //...
        console.log('draw');
    }
}

/*
In this object, both default and changed properties are public !
The way to hide internal properties is to use 'let' instead of 'this',
because the scope will be restricted to the object!
*/
// So we declare it this way:
function Square(length) {
    this.length = length;
    this.area = length**2;
    this.perimeter = length*4;
    // default properties are now private members
    let defaultWidthLine = 1;
    let defaultTypeLine = 'solid';
    let defaultLocation = {x: 0, y: 0};
    // changed properties depending on parameters/criteria/whatever...
    this.widthLine = function(){
        // to access members, we still use 'this'
        // defaultWidthLine
        // this.length
    }
    this.typeLine = function(){
        //...
    }
    this.location = function(){
        //...
    }
    // a method in which we use the altered properties
    this.draw = function() {
        //...
        this.location();
        //...
        console.log('draw');
    }
}

const square = new Square(10);

// LIMITATIONS: Now, we cannot access those internal variables from outside!
// So, what if we want to show -in read-only mode- those properties?

// ============================

// getter and setter functions inside an object
/*
Let's try to improve our object by adding a special Object function
that will let us access to the internal variables
and implement error throwing:
*/

function SquareImproved(length) {
    this.length = length;
    this.area = length**2;
    this.perimeter = length*4;
    // default properties are now private members
    let defaultLocation = {x: 0, y: 0};
    // ==============================
    // The rest of the code is removed for simplicity
    // ==============================
    this.draw = function() {
        console.log('draw');
    }
    // In order to give access to 'defaultLocation'...
    // We define our custom property, assign it a name ('defaultLocation'),
    // And we point to 'this' object!
    Object.defineProperty(this, 'defaultLocation', {
        get: function() {
            return defaultLocation;
        },
        set: function(value) {
            // We set logic to validate the input!
            if(!value.x || !value.y) {
                throw new Error('Invalid location. It must be an object {x:x,y:y}');
            } else {
                defaultLocation = value;
            }        
        }
    });
}

const cuadrado = new SquareImproved(10);
// Example:
cuadrado.defaultLocation = {x:10, y:-5};