// sample data
let mountains = [
  { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi", bestSeason: "Spring" },
  { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi", bestSeason: "Summer" },
  { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi", bestSeason: "Winter" },
  { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi", bestSeason: "Summer" },
  { name: "Monte Amiata", height: 1738, place: "Siena", bestSeason: "Spring" }
];

// display input data on HTML
let inputData = document.querySelector("#input-data");
let jsonMountains = JSON.stringify(mountains, null, 2);
inputData.innerHTML = jsonMountains;

// console.log('original data');
// console.log(mountains);

function merge(dst, src) {
  // will merge the common properties of the dst object to the src object in all levels of nesting
  // leaving any properties that are not common intact
  // see: https://stackoverflow.com/questions/56188121/how-to-merge-two-objects-overriding-null-values
  Object.keys(src).forEach((key) => {
    if (!dst[key]) {
      dst[key] = src[key];
    } else if (typeof src[key] === 'object' && src[key] !== null && typeof dst[key] === 'object' && dst[key] !== null) {
      merge(dst[key], src[key]);
    }
  });
}

// Table object
function Table(table, data) {
  // table: a <table> HTML object
  // data: an array of row objects
  // =======================
  // input
  this.table = table;
  this.initialData = data;  // this variable will never change
  this.data = data;         // we will modify and render data
  this.headers = Object.keys(this.data[0]);

  // methods
  this.render = function() {
    // first render get the body, then append the header
    this.generateTableBody();
    this.generateTableHead();
  };

  this.resetData = function() {
    this.data = this.initialData;
  };

  this.distinct = function(field) {
    return this.data.map(d => d[field])
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(String);
  };

  this.pivot = function(rowField, pivotField, valueField) {
    // first modify data, then combine distinct rows according to rowField
    this.data = this.twoDimGrid(rowField, pivotField, valueField);
    let pivotData = this.mergeDistinct(rowField);
    // reset data
    this.resetData();
    return pivotData;
  };

  this.generateTableHead = function() {
    let thead = this.table.createTHead();
    let row = thead.insertRow();
    let r = 0;  // set to 0 as this is the header
    let c = 0;  // add column id to header
    for (let key of this.headers) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
      let rcCode = "r" + r + "c" + c;
      th.classList.add(rcCode);
      c++;
    }
    return
  };

  this.generateTableBody = function() {
    let r = 0;
    for (let element of this.data) {
      let c = 0;
      let row = this.table.insertRow();
      let rCode = "r" + r;
      row.classList.add(rCode);
      r++;
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
        let rcCode = "r" + r + "c" + c;
        cell.classList.add(rcCode);
        c++;
      }
    }
    return
  };

  this.mergeDistinct = function(field) {
    // field: a string
    // return: new dataset to render
    // we will iterate through each row in the selected field
    // within data, and merge the distinct data objects in an array of rows
    let newArr = [];
    let firstObj = this.data[0];
    for (let obj of this.data) {
      if(obj[field] === firstObj[field]) {
        merge(firstObj, obj);
      } else {
        newArr.push(obj);
      }
    }
    // unshift rather than push
    newArr.unshift(firstObj);
    return newArr;
  };

  this.twoDimGrid = function(rowField, pivotField, valueField) {
    // pivot one column and distributes data along the diagonal
    // get distinct values from pivotField:
    let pivotFieldValues = this.distinct(pivotField);
    let newArr = [];
    for(let element of this.data) {
      let newObj = {};
      newObj[rowField] = element[rowField];
      // loop through values of the pivoted dimension
      for(let val of pivotFieldValues) {
        if(element[pivotField] === val) {
          // TODO !!
          newObj[val] = element[valueField];
        } else {
          newObj[val] = null
        }
      }
      newArr.push(newObj);
    }
    return newArr;
  };

};

// let tableFromClass = document.createElement("table");
let tableFromClass = document.querySelector("#table-from-class");
tableFromClass.id = "table-from-class";

// we are passing a <table> object! not the id of the table !!
// I should check which option is better...
let newTbl = new Table(tableFromClass, mountains);
newTbl.render();

// functions
function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  let r = 0;  // set to 0 as this is the header
  let c = 0;  // add column id to header
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
    let rcCode = "r" + r + "c" + c;
    th.classList.add(rcCode);
    c++;
  }
}

function generateTable(table, data) {
  let r = 0;
  for (let element of data) {
    let c = 0;
    let row = table.insertRow();
    let rCode = "r" + r;
    row.classList.add(rCode);
    r++;
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
      let rcCode = "r" + r + "c" + c;
      cell.classList.add(rcCode);
      c++;
    }
  }
}

function generateTable2(table, data, mainKey) {
  let rows = data.map(m => m[mainKey])
    .filter((value, index, self) => self.indexOf(value) === index);
  // iterate through the distinct rows
  for(let rowVal of rows) {
    let row = table.insertRow();
    for (let element of data) {
      for (key in element) {
        // console.log(key);
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }
}

// selectors
// const container = document.querySelector('#container');
let tableOriginal = document.querySelector("#table-original");
let headOriginal = Object.keys(mountains[0]);
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

function mergeTranspData(data, mainKey) {
  // being data an array of n objects
  // we will iterate through each object and merge one by one
  let newArr = [];
  let firstObj = data[0];
  for (let obj of data) {
    if(obj[mainKey] === firstObj[mainKey]) {
      merge(firstObj, obj);
    } else {
      newArr.push(obj);
    }
  }
  // unshift rather than push
  newArr.unshift(firstObj);
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
console.log('pivotDataName (name as Col, place as Rows)');
console.log(pivotDataName);

let pivot2 = mergeTranspData(pivotDataName, 'place');
console.log('pivotDataName merging distinct places');
console.log(pivot2);


let tablePivotName = document.querySelector("#table-pivot-name");
let headPivotName = Object.keys(pivotDataName[0]);

generateTable(tablePivotName, pivot2);
generateTableHead(tablePivotName, headPivotName);

function getRxCyClass(target) {
  // given a cell target, it will return the corresponding
  // rXcY code found in the className. Returns null if no class found
  // r0cY -> the column header
  // rXc0 -> the row header
  let cellClasses = target.className.split(' ');
  // filter the rXcY class
  let rcClass = cellClasses.filter(c => 
    c.length = 4 && 
    c[0] === 'r' &&
    c[2] === 'c' &&
    typeof parseInt(c[1]) === 'number' &&
    typeof parseInt(c[3]) === 'number'
  );
  if (rcClass.length === 0) {
    return null;  // no rXcY class found
  } else {
    return rcClass[0];
  }
};

function getCell(tableId, rXcY) {
  let tbl = document.querySelector(`#${tableId}`);
  // find the cell within the table !
  let cell = tbl.querySelector(`.${rXcY}`);
  return cell;
};

// ======================
// Event Listeners
tablePivotName.onclick = function(event) {
  let target = event.target;
  if (target.tagName != 'TD') return;
  // get rXcY cell position
  let cellId = getRxCyClass(target);
  // console.log(cellId);

  // get header ref and row ref
  let colId = "r0c" + cellId[3];
  let rowId = "r" + cellId[1] + "c0";
  console.log(`colId: ${colId}, rowId: ${rowId}`);

  // get header cell and row cell
  let colCell = getCell('table-pivot-name', colId);
  let rowCell = getCell('table-pivot-name', rowId);
  console.log(`colName: ${colCell.innerText}, rowName: ${rowCell.innerText}`);

};