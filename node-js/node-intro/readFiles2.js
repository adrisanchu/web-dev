class TreeNode {
  path;
  level;
  size;
  isDirectory;
  children;

  constructor(path, level) {
    this.path = path;
    this.size = 0;
    this.isDirectory = false;
    this.level = level ? level : 0;
    this.children = [];
  }
}

function buildTree(rootPath, { verbose = true, depth = undefined }) {
  const root = new TreeNode(rootPath);

  const stack = [root];

  while (stack.length) {
    const currentNode = stack.pop();

    if (depth === undefined || currentNode.level < depth) {
      if (currentNode) {
        try {

          // get file stats
          try {
            const stats = fs.statSync(currentNode.path);

            // whether current node is file or folder
            if (stats.isDirectory()) {
              currentNode.isDirectory = true;
              if (verbose) {
                console.log("isDirectory: true");
                console.log("=======");
              }
            }

          } catch (e) {
            console.log(err);
          }

          // get all children (if any)
          const children = fs.readdirSync(currentNode.path);

          for (let child of children) {
            const childPath = path.join(currentNode.path, child);
            const childNode = new TreeNode(childPath, currentNode.level + 1);
            if (verbose) console.log("childPath: ", childPath);

            // if the child is a directory, update it and add it to the stack
            const childStats = fs.statSync(childNode.path);
            if (childStats.isDirectory()) {
              childNode.isDirectory = true;
              stack.push(childNode);
            } else {
              // the child is a file. Get its size
              childNode.size = fs.statSync(childNode.path).size;
              if (verbose) console.log("stats: ", stats);
            }

            // add the child to children of the current node
            currentNode.children.push(childNode);
          }
        } catch (e) {
          console.error(`Something went wrong with ${currentNode.path}`);
          console.error(e);
        }
      }
    }
  }

  return root;
}

// ============

const fs = require("fs");
const path = require("path");

// get path from console
const file = process.argv[2];

console.log("requested folder:", file);

// optional parameters:
// depth: specifies how far we parse the folder
// verbose: to display console.logs
const tree = buildTree(file, { depth: 3, verbose: false });

// write the result as JSON
fs.writeFile(
  `node-js/node-intro/tree_.json`,
  JSON.stringify(tree, null, 2),
  (err) => {
    if (err) throw err;
    console.log("Data written to file");
  }
);
