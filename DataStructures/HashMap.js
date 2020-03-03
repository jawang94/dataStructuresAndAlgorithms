class ListNode {
  constructor(data) {
    this.value = data;
    this.next = null;
  }
}

class LinkedList {
  // singly linked list
  constructor(data) {
    this.head = data ? new ListNode(data) : null;
  }

  append(data) {
    if (!this.head) {
      this.head = new ListNode(data);
    } else {
      let current = this.head;

      while (current.next !== null) {
        current = current.next;
      }

      current.next = new ListNode(data);
    }
  }

  delete(data) {
    if (this.head.value === data) {
      this.head = this.head.next;
    } else {
      let current = this.head;

      while (current.next.next !== null) {
        if ((current.next.value = data)) {
          current.next = current.next.next;
        }

        current = current.next;
      }
    }
  }
}

class HashMap {
  constructor() {
    this.hashMap = new Map();
  }

  hashCode(data) {
    let hash = 0;

    if (data.length == 0) {
      return hash;
    }

    for (let i = 0; i < data.length; i++) {
      let char = data.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    // console.log(hash);
    return hash;
  }

  add(data) {
    let address = this.hashCode(data);

    if (!this.hashMap.has(address)) {
      this.hashMap.set(address, new LinkedList(data));

      return this.hashMap.get(address);
    } else {
      let current = this.hashMap.get(address).head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = new ListNode(data);
    }

    return this.hashMap;
  }

  find(data) {
    let address = this.hashCode(data);

    if (this.hashMap.has(address)) {
      let current = this.hashMap.get(address).head;

      while (current !== null) {
        if (current.value === data) {
          // console.log(current);
          return current;
        }
        current = current.next;
      }
    }

    return "Does not exist in hash map";
  }

  delete(data) {
    let address = this.hashCode(data);
  }
}

const newHashMap = new HashMap();
newHashMap.add("Amy");
newHashMap.add("Todd");
newHashMap.add("Jacob");
newHashMap.add("Francine");
newHashMap.add("Jasmine");
newHashMap.add("Tracy");
newHashMap.add("Blaine");
newHashMap.add("Devon");
newHashMap.add("Troy");
newHashMap.find("Jacob");
newHashMap.find("Jasmine");
