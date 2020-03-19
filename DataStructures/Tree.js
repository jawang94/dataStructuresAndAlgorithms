class TreeNode {
  constructor(value) {
    this.value = value ? value : null;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (this.value == null) this.value = value;
    else if (value <= this.value) {
      if (this.left == null) this.left = new TreeNode(value);
      else this.left.insert(value);
    } else {
      if (this.right == null) this.right = new TreeNode(value);
      else this.right.insert(value);
    }
  }

  delete(value) {
    const root = this;
    let parent = null;
    let current = this;

    while (current != null && current.value != value) {
      // find the node to delete and it's parent
      parent = current;
      if (value < current.value) current = current.left;
      else current = current.right;
    }

    if (current == null) return false; // curr will equal null if value not found in tree

    if (current.left == null && current.right == null) {
      // has NO children, is a leaf node
      if (current != root) {
        if (parent.left === current) parent.left = null;
        else if (parent.right === current) parent.right = null;
      } else {
        root = null;
      }
    } else if (current.left != null && current.right != null) {
      // has two children, left AND right
      let successor = current.right.min();
      let successorValue = successor.value;
      this.delete(root, successor.value);
      current.value = successorValue;
    } else {
      // has one child, left OR right
      let child = current.left ? current.left : current.right;
      if (current != root) {
        if (current === parent.left) parent.left = child;
        else parent.right = child;
      } else {
        root = child;
      }
    }

    return root;
  }

  contains(value) {
    let current = this;

    while (current != null) {
      if (current.value === value) return current;
      else if (current.value > value) current = current.left;
      else current = current.right;
    }

    return false;
  }

  min() {
    let current = this;
    while (current.left != null) current = current.left;
    return current;
  }

  max() {
    let current = this;
    while (current.right != null) current = current.right;
    return current;
  }

  inOrderTraverse() {
    if (this.left != null) this.left.inOrderTraverse();
    console.log(this.value);
    if (this.right != null) this.right.inOrderTraverse();
    return "Complete";
  }

  preOrderTraverse() {
    console.log(this.value);
    if (this.left) this.left.inOrderTraverse();
    if (this.right) this.right.inOrderTraverse();
    return "Complete";
  }

  postOrderTraverse() {
    if (this.left) this.left.inOrderTraverse();
    if (this.right) this.right.inOrderTraverse();
    console.log(this.value);
    return "Complete";
  }

  isBST(root, min, max) {
    if (root === null) return true;
    if (root.value < min || root.value > max) return false;

    return (
      this.isBST(root.left, min, root.value) &&
      this.isBST(root.right, root.value + 1, max)
    );
  }
}

class Tree {
  constructor(value) {
    this.root = value ? new TreeNode(value) : new TreeNode();
  }

  insert(value) {
    return this.root.insert(value);
  }

  delete(value) {
    return this.root.delete(value);
  }

  contains(value) {
    return !!this.root.contains(value);
  }

  min() {
    return this.root.min();
  }

  max() {
    return this.root.max();
  }

  inOrderTraverse() {
    return this.root.inOrderTraverse();
  }

  preOrderTraverse() {
    return this.root.preOrderTraverse();
  }

  postOrderTraverse() {
    return this.root.postOrderTraverse();
  }

  isBST() {
    return this.root.isBST(this.root, -Infinity, Infinity);
  }
}

const newTree = new Tree(30);
newTree.insert(55);
newTree.insert(12);
newTree.insert(99);
newTree.insert(67);
newTree.insert(23);
newTree.insert(92);
// console.log(newTree.inOrderTraverse());
// console.log(newTree.isBST());
// console.log(newTree.min());
// console.log(newTree.max());
console.log(newTree.contains(23));
newTree.delete(23);
// console.log(newTree.inOrderTraverse());
console.log(newTree.contains(23));
