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
