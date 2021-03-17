// initialize map
// set view to a place in London lat, lng
// second arg indicates the zoom: the bigger the closer
let map = L.map('map').setView([51.505,-0.087], 13.5);
// set tile from maptiler
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=7Td9jiEj95jDANsmj8iJ', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);

// marker =================
// add a marker at a specific location
let marker = L.marker([51.5, -0.09]).addTo(map);
// add a pop-up to the marker
marker.bindPopup("<b>Hello world!</b><br>I am a popup.");

// marker with special icon
let reactIcon = L.icon({
    iconUrl: './img/logo192.png',
    iconSize: [30, 30]
});

let reactMarker = L.marker([51.51, -0.093], {
    icon:reactIcon
});

reactMarker.addTo(map);
reactMarker.bindPopup(`I am a <b>React</b> icon!<br>(${reactMarker._latlng.lat}, ${reactMarker._latlng.lng})`);

// circle =================
let circle = L.circle([51.508, -0.11], {
    color: 'green',
    fillColor: '#0cd45f',
    fillOpacity: 0.5,
    radius: 300
});

circle.addTo(map);

// polygon ===============
let polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]);

polygon.addTo(map);

// ======================

// event listeners
// on click, get latitude and longitude and fix it to the map!
function onMapClick(e) {
    let popup = L.popup();
    popup
        .setLatLng(e.latlng)
        .setContent(`Coords: (${e.latlng.lat}, ${e.latlng.lng})`)
        .openOn(map);
    // remove popup after 3 seconds
    setTimeout(() => {
            popup.removeFrom(map);
        }, 3000);
};
// get lat and long when mouse moves over the map
function getLatLng(e) {
    console.log(`(${e.latlng.lat}, ${e.latlng.lng})`);
};

map.on('click', onMapClick);
// map.on('mousemove', getLatLng);