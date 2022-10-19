class TreeNode {
  path;
  children;

  constructor(path) {
    this.path = path;
    this.children = [];
  }
}

function buildTree(rootPath) {
  const root = new TreeNode(rootPath);

  const stack = [root];

  while (stack.length) {
    const currentNode = stack.pop();

    if (currentNode) {
      try {
        const children = fs.readdirSync(currentNode.path);

        for (let child of children) {
          const childPath = path.join(currentNode.path, child);
          const childNode = new TreeNode(childPath);
          console.log('a childPath...', childPath);

          fs.lstat(childPath, (err, stats) => {
            if (err)
              console.log(err);
            else {
              console.log("Stat of symlinkToFile")
              console.log(stats);
            }
          })

          currentNode.children.push(childNode);

          if (fs.statSync(childNode.path).isDirectory()) {
            stack.push(childNode);
          }
        }
      } catch (e) {
        console.error(`Something went wrong with ${currentNode.path}`);
        console.error(`{e}`);
      }
    }
  }

  return root;
}

// ============

const fs = require('fs');
const path = require('path');

// get path from console
const file = process.argv[2];

console.log('requested folder:', file);

const tree = buildTree(file);

// console.log('the tree:', JSON.stringify(tree, null, 2));
