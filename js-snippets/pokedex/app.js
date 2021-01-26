// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
// https://pokeapi.co/api/v2/pokemon/1/

const container = document.querySelector('#container');
const pokeSpiritsUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

const generations = {
    1: { id: 'firstGen', name: 'First Generation', first: 1, last: 151 },
    2: { id: 'secondGen', name: 'Second Generation', first: 152, last: 251 },
    3: { id: 'thirdGen', name: 'Third Generation', first: 252, last: 386 },
    4: { id: 'fourthGen', name: 'Fourth Generation', first: 387, last: 494 },
    5: { id: 'fifthGen', name: 'Fifth Generation', first: 495, last: 649 },
    6: { id: 'sixthGen', name: 'Sixth Generation', first: 650, last: 721 },
    7: { id: 'seventhGen', name: 'Seventh Generation', first: 722, last: 898 }
}
// get num of members inside {} object
const numGenerations = Object.keys(generations).length;
let lastPokemon = generations[numGenerations].last;
// one query against the pokeapi
// http://pokeapi.co/api/v2/pokemon/?limit=898
const url = 'http://pokeapi.co/api/v2/pokemon/?limit=' + lastPokemon;

const pokeNames = [];
const pokeUrls = [];

fetch(url)
    .then(response => response.json())
    .then(data => {
        // data is a JSON object that contains the "results" array
        // we can use map in results, but not directly in the data because is an object !
        data.results.map((pokemon) => {
            // get each value from keys "name"
            pokeNames.push(pokemon.name);
            pokeUrls.push(pokemon.url);
        })
    })
    // wait for the answer from the api to render the website!
    .then(renderPokedex)
    .catch(err => {
        console.error('Error: ', err);
    });


// ============================

// control display of containers
let show = function (elem) {
    elem.style.display = 'block';
};

let hide = function (elem) {
    elem.style.display = 'none';
};

let toggle = function (elem) {
    const parent = elem.parentElement;
    // If the element is visible, hide it
    if (window.getComputedStyle(elem).display === 'block') {
        hide(elem);
        parent.classList.remove('opened');
        console.log(parent.classList);
        return;
    }
    // Otherwise, show it
    show(elem);
    parent.classList.add('opened');
    console.log(parent.classList);
};

// ============================

function renderPokedex() {
    // iterate through generations
    for (let g = 1; g <= numGenerations; g++) {
        let name = generations[g].name;
        let id = generations[g].id;

        // div container
        const generationContainer = document.createElement('div');
        generationContainer.classList.add('generation-container', 'toggle-content');
        generationContainer.id = id;

        // anchor tag
        const a = document.createElement('a');
        a.href = '#' + id;
        a.append(name);
        a.classList.add('toggle');

        // span (initially collapsed)
        const span = document.createElement('span');
        span.append(' ➤ ');

        // h2 will embed a and span
        const h2 = document.createElement('h2');
        h2.classList.add('generation-title');

        h2.insertAdjacentElement('beforeend', span);
        h2.insertAdjacentElement('beforeend', a);

        // append container inside h2
        h2.appendChild(generationContainer);

        // h2 goes inside the big container
        container.appendChild(h2);

        // iterate through each generation
        for (let i = generations[g].first; i <= generations[g].last; i++) {
            // iterate through each generation
            // === image ===
            let pokeImg = pokeSpiritsUrl + i.toString() + '.png';
            // console.log(pokeImg);
            const pokemon = document.createElement('div');
            pokemon.classList.add('pokemon');
            // the image itself
            const img = document.createElement('img');
            img.src = pokeImg;
            // === number ===
            const label = document.createElement('li');
            label.innerText = `#${i}`;
            // === name ===
            const pokeName = document.createElement('li');
            pokeName.innerText = pokeNames[i-1]; // array starts at 0 !

            // append all
            const ul = document.createElement('ul');
            ul.appendChild(label);
            ul.appendChild(pokeName);
            pokemon.appendChild(img);
            pokemon.appendChild(ul);
            generationContainer.appendChild(pokemon);
            h2.appendChild(generationContainer);
        }
    }
    // all categories hidden when loading
    const elements = document.querySelectorAll('.generation-container');

    for (let elem of elements) {
        hide(elem);
    }

}

// Listen for click events
document.addEventListener('click', function (event) {
    // get the target
    const target = event.target;
    if (!event.target.classList.contains('toggle')) return;

    // Prevent default link behavior
    event.preventDefault();

    // Get the content
    let content = document.querySelector(event.target.hash);
    // console.dir(content);
    if (!content) return;

    // Toggle the content
    toggle(content);

}, false);
