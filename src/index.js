import BinaryTree from "./BinaryTree";

console.log("Hello");

const valueArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new BinaryTree(valueArray);
console.log(tree.root);

tree.prettyPrint();
