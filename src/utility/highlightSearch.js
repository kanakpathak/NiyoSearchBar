import React from "react";
import PropTypes from "prop-types";

// function to modify the list item to highlight the searchValue
const HighlightSearch = ({ searchValue, item }) => {
  let detail = item;
  if (Array.isArray(item)) {
    detail = detail.join(", ");
  }
  
  const val = searchValue.toLowerCase().split(" ");
  
  const parts = detail.split(new RegExp(`(${val.join("|")})`, "gi"));
  
  return (
    <span>
      {parts.map((part, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <span key={index}>
            {val.includes(part.toLowerCase()) ? (
              <b style={{ color: "blue" }}>{part}</b>
            ) : (
              <>{part}</>
            )}
          </span>
        );
      })}
    </span>
  );
};

HighlightSearch.propTypes = {
  searchValue: PropTypes.string.isRequired,
  item: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
};

export default HighlightSearch;
