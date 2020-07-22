const { Queue } = require('./queue')

class BinarySearchTree {
     constructor(key = null, value = null, parent = null) {
          this.key = key;
          this.value = value;
          this.parent = parent;
          this.left = null;
          this.right = null;
     }

     insert(key, value) {
          // If the tree is empty then this key being inserted is the root node of the tree
          if (this.key == null) {
               this.key = key;
               this.value = value;
          }
          /* If the tree already exists, then start at the root, 
             and compare it to the key you want to insert.
             If the new key is less than the node's key 
             then the new node needs to live in the left-hand branch */
          else if (key < this.key) {
               /* If the existing node does not have a left child, 
                  meaning that if the `left` pointer is empty, 
                  then we can just instantiate and insert the new node 
                  as the left child of that node, passing `this` as the parent */
               if (this.left == null) {
                    this.left = new BinarySearchTree(key, value, this);
               }
               /* If the node has an existing left child, 
                  then we recursively call the `insert` method 
                  so the node is added further down the tree */
               else {
                    this.left.insert(key, value);
               }
          }
          /* Similarly, if the new key is greater than the node's key 
             then you do the same thing, but on the right-hand side */
          else {
               if (this.right == null) {
                    this.right = new BinarySearchTree(key, value, this);
               }
               else {
                    this.right.insert(key, value);
               }
          }
     }

     find(key) {
          // If the item is found at the root then return that value
          if (this.key === key) {
               return this.value;
          }
          /* If the item you are looking for is less than the root 
             then follow the left child.
             If there is an existing left child, 
             then recursively check its left and/or right child
             until you find the item */
          else if (key < this.key && this.left) {
               return this.left.find(key);
          }
          /* If the item you are looking for is greater than the root 
             then follow the right child.
             If there is an existing right child, 
             then recursively check its left and/or right child
             until you find the item */
          else if (key > this.key && this.right) {
               return this.right.find(key);
          }
          // You have searched the tree and the item is not in the tree
          else {
               throw new Error('Key Error');
          }
     }

     remove(key) {
          if (this.key === key) {
               if (this.left && this.right) {
                    const successor = this.right._findMin();
                    this.key = successor.key;
                    this.value = successor.value;
                    successor.remove(successor.key);
               }
               /* If the node only has a left child, 
                  then you replace the node with its left child */
               else if (this.left) {
                    this._replaceWith(this.left);
               }
               /* And similarly if the node only has a right child 
                  then you replace it with its right child */
               else if (this.right) {
                    this._replaceWith(this.right);
               }
               /* If the node has no children then
                  simply remove it and any references to it 
                  by calling "this._replaceWith(null)" */
               else {
                    this._replaceWith(null);
               }
          }
          else if (key < this.key && this.left) {
               this.left.remove(key);
          }
          else if (key > this.key && this.right) {
               this.right.remove(key);
          }
          else {
               throw new Error('Key Error');
          }
     }

     _replaceWith(node) {
          if (this.parent) {
               if (this === this.parent.left) {
                    this.parent.left = node;
               }
               else if (this === this.parent.right) {
                    this.parent.right = node;
               }

               if (node) {
                    node.parent = this.parent;
               }
          }
          else {
               if (node) {
                    this.key = node.key;
                    this.value = node.value;
                    this.left = node.left;
                    this.right = node.right;
               }
               else {
                    this.key = null;
                    this.value = null;
                    this.left = null;
                    this.right = null;
               }
          }
     }

     _findMin() {
          if (!this.left) {
               return this;
          }
          return this.left._findMin();
     }

     bfs(tree, values = []) {
          const queue = new Queue(); // Assuming a Queue is implemented (refer to previous lesson on Queue)
          const node = tree.root;
          queue.enqueue(node);
          while (queue.length) {
               const node = queue.dequeue(); //remove from the queue
               values.push(node.value); // add that value from the queue to an array

               if (node.left) {
                    queue.enqueue(node.left); //add left child to the queue
               }

               if (node.right) {
                    queue.enqueue(node.right); // add right child to the queue
               }
          }

          return values;
     }

     dfs(values=[]) {
          if (this.left) {
              values = this.left.dfs(values);
          }
          values.push(this.value);
  
          if (this.right) {
              values = this.right.dfs(values);
          }
          return values;
      }
}

// 5. Implement different tree traversals
// Using your BinarySearchTree class from your previous lesson, 
// create a binary search tree with the following dataset: 
// 25 15 50 10 24 35 70 4 12 18 31 44 66 90 22. 
// Then implement inOrder(), preOrder(), and postOrder() functions. 
// Test your functions with the following datasets.

// A pre-order traversal should give you the following order: 
// 25, 15, 10, 4, 12, 24, 18, 22, 50, 35, 31, 44, 70, 66, 90
// Works

// In-order: 4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90
// Works

// Post-order: 4, 12, 10, 22, 18, 24, 15, 31, 44, 35, 66, 90, 70, 50, 25
// Works

function inOrder(t) {
     if (t.left) {
          inOrder(t.left)
     }
     console.log(t.key)
     if (t.right) {
          inOrder(t.right)
     }
}

function preOrder(t) {
     console.log(t.key)
     if (t.left) {
          preOrder(t.left)
     }
     if (t.right) {
          preOrder(t.right)
     }
}

function postOrder(t) {
     if (t.left) {
          postOrder(t.left)
     }
     if (t.right) {
          postOrder(t.right)
     }
     console.log(t.key)
}

function main() {

     const BST = new BinarySearchTree();

     BST.insert(25, 25);
     BST.insert(15, 15);
     BST.insert(50, 50);
     BST.insert(10, 10);
     BST.insert(24, 24);
     BST.insert(35, 35);
     BST.insert(70, 70);
     BST.insert(4, 4);
     BST.insert(12, 12);
     BST.insert(18, 18);
     BST.insert(31, 31);
     BST.insert(44, 44);
     BST.insert(66, 66);
     BST.insert(90, 90);
     BST.insert(22, 22);

     console.log(preOrder(BST))     
     console.log(inOrder(BST))     
     console.log(postOrder(BST))     
}

main();

// 6. Find the next commanding officer
// Suppose you have a tree representing a command structure of the Starship USS Enterprise.

//                Captain Picard
//              /                \
//     Commander Riker       Commander Data
//       /         \               \
//  Lt. Cmdr.   Lt. Cmdr.          Lt. Cmdr.
//  Worf        LaForge            Crusher
//    /                           /
// Lieutenant                  Lieutenant
// security-officer            Selar

// This tree is meant to represent who is in charge of lower-ranking officers. 
// For example, Commander Riker is directly responsible for Worf and LaForge. 
// People of the same rank are at the same level in the tree. 
// However, to distinguish between people of the same rank, 
// those with more experience are on the left and those with less on the right 
// (i.e., experience decreases from left to right). Suppose a fierce battle with an enemy ensues. 
// Write a program that will take this tree of commanding officers and outlines the 
// ranking officers in their ranking order so that if officers start dropping like flies, 
// we know who is the next person to take over command.




module.exports = {
     BinarySearchTree
}