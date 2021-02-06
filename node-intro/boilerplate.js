const fs = require('fs');

// create a new folder with three empty files inside
// ========================

// accepts first parameter as a variable
const folderName = process.argv[2] || 'ProjectFolder';

// sync -> use try-catch, will be blocking
// async -> callback, non-blocking in the code !
// we use the sync method. Check the docs on File System
try {
    fs.mkdirSync(folderName);
    // 2nd arg (required) is for the data we send
    fs.writeFileSync(`${folderName}/index.html`, '');
    fs.writeFileSync(`${folderName}/app.js`, '');
    fs.writeFileSync(`${folderName}/styles.css`, '');
} catch (e) {
    console.log('Something went wrong');
    console.log(e);
}