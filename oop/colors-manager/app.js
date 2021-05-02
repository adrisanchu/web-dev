class Color {
    constructor(r, g, b, name) {
        // this runs inmediately after we use 'new' keyword
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
    }
    innerRGB() {
        // destructure from the 'this' object
        const { r, g, b } = this;
        return `${r}, ${g}, ${b}`;
    }
    rgb() {
        // we execute innerRGB cause it is a function,
        // so we put the parenthesis! innerRGB()
        return `rgb(${this.innerRGB()})`;
    }
    // pass transparency as parameter (1 as default)
    rgba( a = 1.0 ) {
        return `rgba(${this.innerRGB()}, ${a})`;
    }
    hex() {
        const { r, g, b } = this;
        return '#' +  ( (1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
}

// example
const c1 = new Color(255,67,89, 'tomato');
