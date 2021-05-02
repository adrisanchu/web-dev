class Color {
    constructor(r, g, b, name) {
        // this runs inmediately after we use 'new' keyword
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
        // whenever we make a new color we calculate the HSL values
        this.calcHSL();
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
    hsl() {
        const { h, s, l } = this;
        return `hsl(${h}, ${s}%, ${l}%)`;
    }
    fulllySaturated() {
        // force 100% saturation
		const { h, l } = this;
		return `hsl(${h},100%, ${l}%)`;
	}
    opposite() {
        // generate the opposite hsl color
        const { h, s, l } = this;
        const newHue = (h + 180) % 360;
        return `hsl(${newHue}, ${s}%, ${l}%)`;
    }
    // transform RGB into HSL
    calcHSL() {
        let { r, g, b } = this;
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;

        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0) h = 0;
        else if (cmax == r)
            // Red is max
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            // Green is max
            h = (b - r) / delta + 2;
        else
            // Blue is max
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0) h += 360;
        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        this.h = h;
        this.s = s;
        this.l = l;
    }
}

// example
const c1 = new Color(255,67,89, 'tomato');
