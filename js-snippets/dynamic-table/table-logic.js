// the main idea is to be able to parse some data into 
// a table object (headers, rows, cells)

// sample data
let mountains = [
  { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
  { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
  { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
  { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
  { name: "Monte Amiata", height: 1738, place: "Siena" }
];

// data2table(mountains), shall render something like:
/*
table: {
  r1c1: {
    rowId: name,
    colId: place,
    row: "Monte Falco",
    col: "Parco Foreste Casentinesi",
    val: 1658,
  },
  r1c2: {
    row: 1,
    col: 2,
    val: ,
  },
  ...
}

[ { headers: [name, height, place] },
  { body: {
      r1: {"Monte Falco", 1658, "Parco Foreste Casentinesi" },
      r2: {"Monte Falterona", 1654, "Parco Foreste Casentinesi" },
      r3: {"Poggio Scali", 1520, "Parco Foreste Casentinesi" },
      r4: {"Pratomagno", 1592, "Parco Foreste Casentinesi" },
      r5: {"Monte Amiata", 1738, "Siena" }
    }
  }
];

*/