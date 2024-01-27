import BinaryTree from "./BinaryTree";

console.log("Hello");

const valueArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new BinaryTree(valueArray);
console.log(tree.root);
console.log("test");
tree.prettyPrint();

tree.insert(68);
tree.insert(67);
tree.insert(70);
tree.insert(69);

console.log(tree.root);

tree.prettyPrint();

tree.delete(8);
console.log("\n");
tree.prettyPrint();

console.log("find 7", tree.find(7));
console.log("find 67", tree.find(67));

console.log("Loop Breathorder", tree.levelOrderLoop());
console.log("Recursion Breathorder", tree.levelOrderRecur());
// console.log(tree.levelOrderLoop((node) => console.log(node))); // callback test

console.log("Depth preorder", tree.preOrder());
console.log("Depth inorder", tree.inOrder());
console.log("Depth postorder", tree.postOrder());
console.log("height", tree.height());
tree.insert(71);
tree.insert(72);
tree.prettyPrint();
console.log("height", tree.height());
let node = tree.find(73);
console.log(`height of ${node?.data ?? null}`, tree.height(node));
console.log(`depth of ${node?.data ?? null}`, tree.depth(node));
console.log("Is Balanced?", tree.isBalanced());

console.log("Rebalancing....");
tree.rebalance();
tree.prettyPrint();
console.log("Is Balanced?", tree.isBalanced());
