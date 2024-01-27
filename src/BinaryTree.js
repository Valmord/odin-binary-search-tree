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

  rebalance() {
    this.buildTree(this.inOrder());
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
    if (root === null) return null;
    if (value < root.data) return this.find(value, root.left);
    if (value > root.data) return this.find(value, root.right);
    return root;
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
    else return nodeArray.map((node) => node.data);
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
    else return nodeArray.map((node) => node.data);
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
    else return nodeArray.map((node) => node.data);
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
    else return nodeArray.map((node) => node.data);
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
    else return nodeArray.map((node) => node.data);
  }

  height(node = this.root) {
    if (node === null) return -1;
    let left = this.height(node.left);
    let right = this.height(node.right);
    let max = Math.max(left, right) + 1;
    return max;
  }

  depth(node = this.root) {
    let count = 0;
    let currentNode = this.root;
    while (currentNode !== null && node !== null) {
      if (node.data === currentNode.data) return count;
      if (node.data < currentNode.data) {
        currentNode = currentNode.left;
        count += 1;
      }
      if (node.data > currentNode.data) {
        currentNode = currentNode.right;
        count += 1;
      }
    }
    return -1;
  }

  isBalancedRecur(root = this.root) {
    if (root === null) return 0;
    let left = this.isBalancedRecur(root.left);
    if (left === -1) return -1;
    let right = this.isBalancedRecur(root.right);
    if (right === -1) return -1;
    if (Math.abs(left - right) >= 2) return -1;
    return Math.max(left, right) + 1;
  }

  isBalanced(root = this.root) {
    return this.isBalancedRecur(root) >= 0;
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
