/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */

// initializes data structure here
export const TrieNode = function () {
  this.links = {};
  this.userObject = [];
};

export const WordDictionary = function () {
  this.root = new TrieNode();
};

/* Add functions to WordDictionary Prototype */

/* function to create Trie structure for the incoming words
  adds reference obj of userData in userObject for incoming word */
WordDictionary.prototype.addWord = function (word, obj) {
  let node = this.root;
  for (let i = 0; i < word.length; i += 1) {
    if (!(word[i] in node.links)) {
      const newNode = new TrieNode();
      node.links[word[i]] = newNode;
    }
    node = node.links[word[i]];
    node.userObject.push(obj);
  }
};

/* function to search word, searches space separated words 
  and returns userObj associated with words */
WordDictionary.prototype.search = function (searchWord) {
  const res = [];
  searchWord.split(" ").map(word => {
    let node = this.root;
    for (let i = 0; i < word.length; i += 1) {
      if (!(word[i] in node.links)) return [];
      node = node.links[word[i]];
    }
    res.push(...node.userObject);
  });
  const result = new Set(res);
  return [...result];
};
