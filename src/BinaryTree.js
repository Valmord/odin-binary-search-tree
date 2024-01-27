import Node from "./Node";

export default class BinaryTree {
  constructor(array) {
    this.root = this.buildTree(array) || null;
  }

  buildTreeRecursion(array) {
    if (array.length === 0) return null;
    const middle = Math.floor(array.length / 2);
    const root = new Node(array[middle]);
    root.left = this.buildTreeRecursion(array.slice(0, middle));
    root.right = this.buildTreeRecursion(array.slice(middle + 1));
    return root;
  }

  buildTree(array) {
    const noDupeArray = [...new Set(array)];
    noDupeArray.sort((a, b) => a - b);
    this.root = this.buildTreeRecursion(noDupeArray);
    return this.root;
  }

  insert(value, root = this.root) {
    if (root === null) return new Node(value);

    if (value === root.data) return root;
    if (value < root.data) root.left = this.insert(value, root.left);
    if (value > root.data) root.right = this.insert(value, root.right);

    return root;
  }

  delete(value, root = this.root) {
    if (root === null) return null; // If doesn't exist

    if (value < root.data) {
      root.left = this.delete(value, root.left);
      return root;
    }
    if (value > root.data) {
      root.right = this.delete(value, root.right);
      return root;
    }

    // Below here means value === this.root.data

    if (root.left === null) return root.right;
    if (root.right === null) return root.left;

    if (root.left !== null && root.right !== null) {
      let node = root.right;
      let nodeParent = root;
      while (node.left !== null) {
        nodeParent = node;
        node = node.left;
      }
      if (nodeParent === root) root.right = node.right;
      else nodeParent.left = node.right;
      node.left = root.left;
      node.right = root.right;
      if (root === this.root) this.root = node;
      root = node;
    }

    return root;
  }

  find(value, root = this.root) {
    if (value === root.data) return root;
    if (value < root.data) return this.find(value, root.left);
    if (value > root.data) return this.find(value, root.right);
    return null;
  }

  levelOrderLoop(callback = null) {
    const queue = [this.root];
    let node = this.root;
    let nodeArray = [];
    while (queue.length > 0) {
      node = queue.shift();
      nodeArray.push(node);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
    if (callback !== null) nodeArray.forEach(callback);
    else return nodeArray;
  }

  levelOrderRecur(callback = null) {
    const queue = [this.root];
    const nodeArray = [];

    function recur(root) {
      nodeArray.push(root);
      if (root.left !== null) queue.push(root.left);
      if (root.right !== null) queue.push(root.right);
      if (queue.length === 0) return root;
      recur(queue.shift());
    }
    recur(queue.shift());

    if (callback !== null) nodeArray.forEach(callback);
    else return nodeArray;
  }

  preOrder(callback = null) {
    const nodeArray = [];

    function recur(root) {
      nodeArray.push(root);
      if (root.left !== null) recur(root.left);
      if (root.right !== null) recur(root.right);
      return root;
    }
    recur(this.root);

    if (callback !== null) nodeArray.forEach(callback);
    else return nodeArray;
  }

  inOrder(callback = null) {
    const nodeArray = [];

    function recur(root) {
      if (root.left !== null) recur(root.left);
      nodeArray.push(root);
      if (root.right !== null) recur(root.right);
      return root;
    }
    recur(this.root);

    if (callback !== null) nodeArray.forEach(callback);
    else return nodeArray;
  }

  postOrder(callback = null) {
    const nodeArray = [];

    function recur(root) {
      if (root.left !== null) recur(root.left);
      if (root.right !== null) recur(root.right);
      nodeArray.push(root);
      return root;
    }
    recur(this.root);

    if (callback !== null) nodeArray.forEach(callback);
    else return nodeArray;
  }
  inOrder(callback = null) {
    const nodeArray = [];

    function recur(root) {
      if (root.left !== null) recur(root.left);
      nodeArray.push(root);
      if (root.right !== null) recur(root.right);
      return root;
    }
    recur(this.root);

    if (callback !== null) nodeArray.forEach(callback);
    else return nodeArray;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
