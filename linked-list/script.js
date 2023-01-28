class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.headNode = new Node();
  }

  append(value) {
    if (this.head().value === null) {
      this.head().value = value;
    } else {
      this.tail().next = new Node(value);
    }
  }

  prepend(value) {
    const newHead = new Node(value, this.head()); // This is the new head()
    this.headNode = newHead;
  }

  size() {
    let size = 0;
    let cursor = this.head();
    while (cursor.next !== null) {
      size += 1;
      cursor = cursor.next;
    }
    return size;
  }

  head() {
    return this.headNode;
  }

  tail() {
    let cursor = this.head();
    while (cursor.next !== null) {
      cursor = cursor.next;
    }
    return cursor;
  }

  at(index) {
    let cursor = this.head();
    for (let i = 0; i < index; i++) {
      cursor = cursor.next;
    }
    return cursor;
  }

  pop() {
    /* Set the 'next' on the Node before the 
    current tail to 'null', since it will be the new tail */
    this.at(this.size() - 1).next = null;

    // Now the old tail is cut off from the list.
  }

  contains(value) {
    let cursor = this.head();
    while (cursor.next !== null) {
      if (cursor.value === value) {
        return true;
      }
      cursor = cursor.next;
    }
    return false;
  }

  find(value) {
    let cursor = this.head();
    let i = 0;
    while (cursor.next !== null) {
      if (cursor.value === value) {
        return i;
      }
      cursor = cursor.next;
      i += 1;
    }
    return false;
  }

  toString() {
    let cursor = this.head();
    let print = "";
    while (cursor.next !== null) {
      print += `(${cursor.value}) -> `;
      cursor = cursor.next;
    }
    return `${print}null`;
  }
}

const L1 = new LinkedList();

L1.append(44);
L1.append(55);
L1.append(88);
L1.append(99);
L1.prepend(105);
console.log(L1.size());
console.log(L1.find(88));
console.log(L1.toString());
console.log(L1.pop());
console.log(L1.toString());
const banana = new Node(5, "twtw");

console.log(banana);
