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
