// To run: node node-js/nod-intro/readFiles.js {the path!}
// valid path in Mac:
// /Users/Adri/Downloads
// /Users/Adri/Music/Music

const fs = require('fs');
const path = require('path');

// read all files from a given dir
const readDirRecursive = async (filePath) => {
  const dir = await fs.promises.readdir(filePath);
  const files = await Promise.all(
    dir.map(async (relativePath) => {
      const absolutePath = path.join(filePath, relativePath);
      const stat = await fs.promises.lstat(absolutePath);

      return stat.isDirectory() ? readDirRecursive(absolutePath) : absolutePath;
    })
  );

    return files;
  // return files.flat();
};

// get path from console
const file = process.argv[2];

console.log('requested folder:', file);

readDirRecursive(file).then((r) => {
  console.log('the file list:', r);
});

/*
fs.stat(file, (err, stats) => {
  if (err) throw err;
  if (stats.isDirectory()) console.log('Its a directory!');
});
*/

console.log('Done!');
