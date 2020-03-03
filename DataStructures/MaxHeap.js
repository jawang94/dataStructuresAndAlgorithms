class MaxHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }
  peek() {
    return this.heap[0];
  }
  glare() {
    return this.heap;
  }
  hasLeftChild(parentIndex) {
    return 2 * parentIndex + 1 < this.size();
  }
  hasRightChild(parentIndex) {
    return 2 * parentIndex + 2 < this.size();
  }
  hasParent(childIndex) {
    return Math.floor((childIndex - 1) / 2) >= 0;
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
  getLeftChild(parentIndex) {
    return this.heap[this.getLeftChildIndex(parentIndex)];
  }
  getRightChild(parentIndex) {
    return this.heap[this.getRightChildIndex(parentIndex)];
  }
  getParent(childIndex) {
    return this.heap[this.getParentIndex(childIndex)];
  }

  add(...data) {
    data.forEach(e => {
      this.heap.push(e);
      this.heapUp();
    });
  }

  poll(num) {
    let iterations = num || 1;
    let polled = [];

    while (iterations > 0) {
      let item = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapDown();
      polled.push(item);
      iterations -= 1;
    }

    return `Removed ${polled}`;
  }

  heapUp() {
    let index = this.size() - 1;

    while (
      this.hasParent(index) &&
      this.heap[this.getParentIndex(index)] < this.heap[index]
    ) {
      const parentIndex = this.getParentIndex(index);
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index]
      ];
      index = parentIndex;
    }
  }

  heapDown() {
    let index = 0;

    while (this.hasLeftChild(index)) {
      let maxChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) &&
        this.heap[this.getRightChildIndex(index)] > this.heap[maxChildIndex]
      ) {
        maxChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index] > this.heap[maxChildIndex]) {
        break;
      } else if (this.heap[index] < this.heap[maxChildIndex]) {
        [this.heap[index], this.heap[maxChildIndex]] = [
          this.heap[maxChildIndex],
          this.heap[index]
        ];
        index = maxChildIndex;
      }
    }
  }
}

const newHeap = new MaxHeap();

newHeap.add(11, 88, 44, 66, 22, 33);
console.log(newHeap.size());
console.log(newHeap.glare());
newHeap.poll(2);
console.log(newHeap.glare());
