class Queue {
  constructor() {
    this.newestItems = [];
    this.oldestItems = [];
  }

  enqueue(...value) {
    value.forEach(e => this.newestItems.push(e));

    return this.newestItems;
  }

  dequeue() {
    if (this.oldestItems.length) return this.oldestItems.pop();
    else {
      while (this.newestItems.length) {
        this.oldestItems.push(this.newestItems.pop());
      }

      return this.oldestItems.pop();
    }
  }

  peek() {
    return this.oldestItems.pop();
  }
}

let newQueue = new Queue();
newQueue.enqueue(1, 2, 3, 4, 5);
console.log(newQueue);
newQueue.dequeue();
newQueue.dequeue();
console.log(newQueue);
newQueue.enqueue(6, 7);
console.log(newQueue);
newQueue.dequeue();
newQueue.dequeue();
newQueue.dequeue();
newQueue.dequeue();
console.log(newQueue);
