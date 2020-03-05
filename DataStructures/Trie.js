class TrieNode {
  constructor() {
    this.keys = new Map();
    this.isEnd = false;
    this.setEnd = () => {
      this.isEnd = true;
    };
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  add(word, node = this.root) {
    if (!word.length) {
      node.setEnd();

      return;
    }

    if (!node.keys.has(word[0])) {
      node.keys.set(word[0], new TrieNode());
    }

    return this.add(word.substr(1), node.keys.get(word[0]));
  }

  isWord(word) {
    let node = this.root;

    while (word.length) {
      if (!node.keys.has(word[0])) return false;
      else {
        node = node.keys.get(word[0]);
        word = word.substr(1);
      }
    }

    return true;
  }

  printAll() {
    let words = [];

    let search = (node, string) => {
      for (let letter of node.keys.keys()) {
        search(node.keys.get(letter), string.concat(letter));
      }

      node.isEnd ? words.push(string) : undefined;
    };

    search(this.root, "");

    return words.length ? words : "No Words";
  }
}

let newTrie = new Trie();
newTrie.add("hi");
newTrie.add("bye");
newTrie.add("yellow");
console.log(newTrie.isWord("hi"));
console.log(newTrie.isWord("bye"));
console.log(
  newTrie
    .printAll()
    .map(e => `${e} | `)
    .join(",")
    .replace(/,/g, "")
    .trim()
);
// console.log(newTrie);
