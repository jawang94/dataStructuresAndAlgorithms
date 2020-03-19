class ListNode {
  constructor(value) {
    this.value = value ? value : null;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    this.head = value ? new ListNode(value) : new ListNode();
  }

  append(value) {
    if (this.head.value === null) {
      this.head.value = value;
      return this.head;
    }

    let current = this.head;
    while (current.next != null) {
      current = current.next;
    }
    current.next = new ListNode(value);

    return current.next;
  }

  prepend(value) {
    if (this.head.value === null) {
      this.head.value = value;
      return this.head;
    }

    let newHead = new ListNode(value);
    newHead.next = this.head;
    this.head = newHead;

    return this.head;
  }

  delete(value) {
    if (this.head.value === value) {
      this.head = this.head.next;
      return this.head;
    }

    let current = this.head;
    while (current.next != null) {
      if (current.next.value === value) {
        current.next = current.next.next;
        return true;
      } else current = current.next;
    }

    console.log(`Value of ${value} not found.`);

    return false;
  }

  has(value) {
    if (this.head.value === value) return true;

    let current = this.head;
    while (current.next != null) {
      if (current.value === value) return true;
      else current = current.next;
    }

    return false;
  }

  printList() {
    let current = this.head;

    while (current != null) {
      console.log(
        `${current.value} => ${current.next ? current.next.value : null}`
      );
      current = current.next;
    }
  }
}

// let newLinkedList = new LinkedList();
// newLinkedList.prepend(5);
// newLinkedList.append(6);
// newLinkedList.append(7);
// newLinkedList.append(8);
// newLinkedList.prepend(9);
// // expected behavior: 9 => 5, 5 => 6, 6 => 7, 7 => 8, 8 => null;
// newLinkedList.delete(8);
// // expected behavior: 9 => 5, 5 => 6, 6 => 7, 7 => null;
// newLinkedList.printList();

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }
  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }
  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }
  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.size();
  }
  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.size();
  }
  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }
  getLeftChild(parentIndex) {
    // always check hasLeftChild() before calling
    return this.heap[this.getLeftChildIndex(parentIndex)];
  }
  getRightChild(parentIndex) {
    // always check hasRightChild() before calling
    return this.heap[this.getRightChildIndex(parentIndex)];
  }
  getParent(childIndex) {
    // always check hasParent() before calling
    return this.heap[this.getParentIndex(childIndex)];
  }
  add(...values) {
    values.forEach(value => {
      this.heap.push(value);
      this.heapUp();
    });
    return this.heap;
  }
  poll() {
    if (!this.size()) return null;

    let item = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapDown();

    return item;
  }
  heapUp() {
    let index = this.size() - 1;

    while (this.hasParent(index)) {
      let parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex] < this.heap[index]) break;
      else {
        [this.heap[parentIndex], this.heap[index]] = [
          this.heap[index],
          this.heap[parentIndex]
        ];
        index = parentIndex;
      }
    }

    return this.heap;
  }
  heapDown() {
    let index = 0;

    while (this.hasLeftChild(index)) {
      let minChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) &&
        this.heap[this.getRightChildIndex(index)] < this.heap[minChildIndex]
      ) {
        minChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index] < this.heap[minChildIndex]) break;
      else if (this.heap[minChildIndex] < this.heap[index]) {
        [this.heap[minChildIndex], this.heap[index]] = [
          this.heap[index],
          this.heap[minChildIndex]
        ];
        index = minChildIndex;
      }
    }

    return this.heap;
  }
  printHeap() {
    console.log(this.heap);
  }
}

// let newMinHeap = new MinHeap();
// newMinHeap.add(11, 33, 55, 22, 88, 77, 44);
// newMinHeap.poll();
// newMinHeap.poll();
// newMinHeap.add(1);
// newMinHeap.printHeap();

class HashMap {
  constructor() {
    this.hashMap = new Map();
  }

  hash(value) {
    let hash = 0;

    for (let i = 0; i < value.length; i++) {
      let code = value[i].charCodeAt(0);
      hash = (code << 5) + code - hash;
    }

    return hash;
  }

  add(value) {
    let hashedValue = this.hash(value);

    if (
      this.hashMap.has(hashedValue) &&
      this.hashMap.get(hashedValue) !== null
    ) {
      let current = this.hashMap.get(hashedValue).head;

      while (current != null && current.next != null) {
        if ((current.value = value)) return current;
        else current = current.next;
      }

      current.next = new ListNode(value);
    } else {
      this.hashMap.set(hashedValue, new LinkedList(value));
    }
  }

  find(value) {
    let hashedValue = this.hash(value);

    if (this.hashMap.has(hashedValue)) {
      let current = this.hashMap.get(hashedValue).head;
      while (current != null) {
        if (current.value === value) return current;
        else current = current.next;
      }
    }

    return false;
  }

  delete(value) {
    let hashedValue = this.hash(value);

    if (this.hashMap.has(hashedValue)) {
      let current = this.hashMap.get(hashedValue).head;

      if (current.value === value) {
        this.hashMap.set(hashedValue, current.next);
        current.next = null;
      } else if (current.next === null) {
        return false;
      } else {
        while (current.next.next != null) {
          if (current.next.value === value) {
            let deleted = current.next;
            current.next = current.next.next;
            return deleted;
          }
          current = current.next;
        }
      }
    }

    return false;
  }

  print() {
    console.log(this.hashMap);
  }
}

// let newHashMap = new HashMap();
// newHashMap.add("Jason");
// newHashMap.add("Jaysqwdqwdqwon");
// newHashMap.add("Thomas");
// newHashMap.add("Lucy");
// console.log(newHashMap.find("Lucy"));
// newHashMap.delete("Thomas");
// newHashMap.add("Thomas");
// newHashMap.print();

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
    this.setEnd = () => (this.isEnd = true);
  }
}
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  add(word, parent = this.root) {
    if (!word.length && parent.isEnd) return;
    else if (!word.length && !parent.isEnd) return parent.setEnd();

    if (!parent.children.has(word[0])) {
      parent.children.set(word[0], new TrieNode());
    }

    return this.add(word.substring(1), parent.children.get(word[0]));
  }

  delete(word) {
    /** A little bit more complex, due to having to track which word paths end
     *  at specific nodes. If reached end of word && node still contains other
     *  children && node isEnd, do we setEnd to false? or not? */
  }

  isWord(word, parent = this.root) {
    if (word.length === 0 && parent.isEnd) return true;
    else if (word.length === 0 && !parent.isEnd) return false;
    else if (!parent.children.has(word[0])) return false;
    else return this.add(word.substring(1), parent.children.get(word[0]));
  }

  print() {
    let words = [];

    const search = (node, string) => {
      for (let letter of node.children.keys()) {
        search(node.children.get(letter), string.concat(letter));
      }
      if (node.isEnd) words.push(string);
    };

    search(this.root, "");

    return words.length ? words : null;
  }
}

// let newTrie = new Trie();
// newTrie.add("Hi");
// newTrie.add("Bye");
// newTrie.add("Ello");
// console.log(newTrie.root.children);
// console.log(
//   newTrie
//     .print()
//     .map(e => `${e} => `)
//     .join(",")
//     .replace(/,/g, "")
//     .trim()
// );

class TreeNode {
  constructor(value) {
    this.value = value ? value : null;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(value) {
    this.root = value ? new TreeNode(value) : new TreeNode();
  }

  insert(value) {
    if (this.root.value === null) {
      this.root.value = value;
    }

    const recurse = node => {
      if (value <= node.value) {
        if (node.left === null) node.left = new TreeNode(value);
        else recurse(node.left);
      } else if (value > node.value) {
        if (node.right === null) node.right = new TreeNode(value);
        else recurse(node.right);
      }
    };

    recurse(this.root);
  }

  delete(value) {
    const recurse = (node, value) => {
      if (node === null) return false;

      if (value < node.value) {
        node.left = recurse(node.left, value);
        return node;
      } else if (value > node.value) {
        node.right = recurse(node.right, value);
        return node;
      } else {
        if (node.left === null && node.right === null) {
          node = null;
          return node;
        } else if (node.left != null && node.right != null) {
          let successor = node.right;
          while (successor.left != null) successor = successor.left;
          node.value = successor.value;
          node.right = recurse(node.right, successor.value);
          return node;
        } else {
          if (node.left === null) return node.right;
          else if (node.right === null) return node.left;
        }
      }
    };

    return recurse(this.root, value);
  }

  contains(value) {
    let output = false;

    const recurse = node => {
      if (node === null) return;

      if (value === node.value) return (output = true);
      else if (value < node.value) recurse(node.left);
      else recurse(node.right);
    };

    recurse(this.root);

    return output;
  }

  inOrderTraversal() {
    if (!this.root) return [];
    let output = [];

    const recurse = node => {
      if (node === null) return;

      recurse(node.left);
      output.push(node.value);
      recurse(node.right);
    };

    recurse(this.root);

    return output;
  }

  getMax(node) {
    let current = node || this.root;
    while (current.right != null) current = current.right;
    return current;
  }

  getMin(node) {
    let current = node || this.root;
    while (current.left != null) current = current.left;
    return current;
  }
}

// const newTree = new Tree(3);
// newTree.insert(1);
// newTree.insert(5);
// newTree.insert(7);
// newTree.insert(8);
// newTree.insert(13);
// newTree.insert(4);
// newTree.insert(4.5);
// newTree.insert(6);
// newTree.delete(7);
// console.log(newTree.inOrderTraversal());
// console.log(newTree.root.right.right);

class GraphNode {
  constructor(value) {
    this.value = value ? value : null;
    this.edges = new Map();
  }
}

// Each edge will be a [key, value] pair where key = associated vertex and value = weight on edge

class Graph {
  constructor() {
    this.vertices = new Map();
  }

  addVertex(value) {
    if (!this.vertices.has(value)) {
      this.vertices.set(value, new GraphNode(value));
    }
  }

  addEdge(vertex1, vertex2, weight) {
    let node1 = this.vertices.get(vertex1);
    let node2 = this.vertices.get(vertex2);
    if (!node1 || !node2) return false;
    else {
      node1.edges.set(vertex2, { node: node2, weight: weight ? weight : null });
      node2.edges.set(vertex1, { node: node1, weight: weight ? weight : null });
    }
  }

  removeEdge(vertex1, vertex2) {
    let node1 = this.vertices.get(vertex1);
    let node2 = this.vertices.get(vertex2);
    if (!node1 || !node2) return false;
    else {
      node1.edges.delete(vertex2);
      node2.edges.delete(vertex1);
    }
  }

  // hasPath(startValue, endValue) {
  //   let startNode = this.vertices.get(startValue);
  //   if (!startNode) return false;
  //   else {
  //     let nodeQueue = [];
  //   }
  // }
}

let newGraph = new Graph();
newGraph.addVertex(1);
newGraph.addVertex(2);
newGraph.addVertex(3);
newGraph.addVertex(4);
newGraph.addVertex(5);
newGraph.addVertex(6);
newGraph.addVertex(7);
newGraph.addEdge(1, 2, 3000);
console.log(newGraph.vertices);
