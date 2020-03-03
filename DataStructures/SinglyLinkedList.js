class ListNode {
  constructor(data) {
    this.value = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor(data) {
    this.head = data ? new ListNode(data) : null;
  }

  append(data) {
    if (!this.head) this.head = new ListNode(data);
    else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = new ListNode(data);
    }
  }

  prepend(data) {
    const newHead = new ListNode(data);
    newHead.next = this.head;
    this.head = newHead;
  }

  delete(data) {
    if (!this.head) return null;
    else if (this.head.value === data) head = this.head.next;
    else {
      let current = this.head;
      while (current.next.next !== null) {
        if (current.next.value === data) {
          current.next = current.next.next;
          return current.next;
        } else current = current.next;
      }
    }
  }
}

const newLL = new SinglyLinkedList(1);
newLL.append(2);
newLL.prepend(3);
newLL.append(4);
newLL.delete(2);
newLL.delete(1);
newLL.delete(2);
console.log(newLL);
