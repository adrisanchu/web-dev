// sample data
let mountains = [
  { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
  { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
  { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
  { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
  { name: "Monte Amiata", height: 1738, place: "Siena" }
];

// functions
function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

// selectors
// const container = document.querySelector('#container');
let tableOriginal = document.querySelector("#table-original");

let headOriginal = Object.keys(mountains[0]);

// console.log(data);

// render table
generateTable(tableOriginal, mountains); // generate the table first
generateTableHead(tableOriginal, headOriginal); // then the head

// ================================

function transpData(data, mainKey, pivotKey, valueKey) {
  // get different values from pivotKey:
  let pivotKeyVals = data.map(m => m[pivotKey])
    .filter((value, index, self) => self.indexOf(value) === index);
  
  let newArr = [];

  for(let element of data) {
    let newObj = {};
    // console.log(element[mainKey]);
    newObj[mainKey] = element[mainKey];
    // loop through values of the pivoted dimension
    for(let val of pivotKeyVals) {
      if(element[pivotKey] === val) {
        // TODO !!
        newObj[val] = element[valueKey];
      } else {
        newObj[val] = null 
      }
    }
    newArr.push(newObj);
  }
  return newArr;
}


let pivotDataPlace = transpData(mountains, 'name', 'place', 'height');
/*
shall return:
let mountains = [
  { name: "Monte Falco", Parco Foreste Casentinesi: 1658 },
  { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
  { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
  { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
  { name: "Monte Amiata", height: 1738, place: "Siena" }
];
*/

// new scenario: transposed column
let tablePivotPlace = document.querySelector("#table-pivot-place");
let headPivotPlace = Object.keys(pivotDataPlace[0]);

generateTable(tablePivotPlace, pivotDataPlace);
generateTableHead(tablePivotPlace, headPivotPlace);

// ===============
// another one!

let pivotDataName = transpData(mountains, 'place', 'name', 'height');
console.log(pivotDataName);

let tablePivotName = document.querySelector("#table-pivot-name");
let headPivotName = Object.keys(pivotDataName[0]);

generateTable(tablePivotName, pivotDataName);
generateTableHead(tablePivotName, headPivotName);