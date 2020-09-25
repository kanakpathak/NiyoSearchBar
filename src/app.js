import React, { useEffect, useState } from "react";
import Search from "./components/search";
import { WordDictionary } from "./services/userService";
import userData from "./data/userData.json";

const App = () => {
  // state that will store result of #Trie implementation over user data
  const [dict, setDict] = useState({});

  // function to store words
  const addWordData = () => {
    const wordDict = new WordDictionary();

    // looping through each space separated word and storing it in dict
    userData.map(obj => {
      // eslint-disable-next-line array-callback-return
      return Object.entries(obj).map(item => {
        if (Array.isArray(item[1])) {
          item[1].map(word => wordDict.addWord(word.toLowerCase(), obj));
        } else {
          item[1]
            .split(" ")
            .map(word => wordDict.addWord(word.toLowerCase(), obj));
        }
      });
    });
    // console.log("dict", wordDict);
    return wordDict;
  };

  // create Trie structure from userData.json and setDict only at the mounting of app.
  useEffect(() => {
    const wordDict = addWordData();
    setDict(wordDict);
  }, []);

  return (
    <div className="app">
      <h1> Search App </h1>
      <Search dict={dict} />
    </div>
  );
};

export default App;
