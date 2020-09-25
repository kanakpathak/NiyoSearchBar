import React, { useState } from "react";
import PropTypes from "prop-types";
import DisplaySearch from "./DisplaySearch";
import "../../styles/customStyles.css";

const Search = ({ dict }) => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);

  const handleInputChange = event => {
    setValue(event.target.value);
    setResult(dict.search(event.target.value.toLowerCase()));
  };

  return (
    <div className="searchContainer">
      <input
        className="inputBox"
        type="text"
        placeholder="Search by id, name, address, contact..."
        name="searchBox"
        value={value}
        onChange={handleInputChange}
      />
      {value !== "" && (
        <div className="searchList">
          <DisplaySearch searchList={result} searchValue={value} />
        </div>
      )}
    </div>
  );
};

Search.propTypes = {
  dict: PropTypes.objectOf(Object).isRequired
};

export default Search;
