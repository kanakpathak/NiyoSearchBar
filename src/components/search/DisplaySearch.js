import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import HighlightSearch from "../../utility/highlightSearch";
import "../../styles/customStyles.css";

const DisplaySearch = ({ searchList, searchValue }) => {
  // state to maintain currently selected item and it's index resepctively.
  const [selected, setSelected] = useState([false, -1]);
  // state to maintaine mouse position to give determine preference over keyboard event
  const [pos, setPos] = useState(0);
  // state to maintains array of refs of length searchList, to scrollIntoView purpose
  const ref = useRef([]);

  const scrollIntoView = () => {
    const index = selected[1];
    if (index >= 0) {
      const idx = ref.current[index].id;
      if (parseInt(idx, 10) === index)
        ref.current[index].scrollIntoView({
          behavior: "smooth"
        });
    }
  };

  const navigationHandler = (event, index) => {
    if (event.type === "keydown") {
      let shift;
      if (event.key === "ArrowDown" || event.key === "Tab") shift = 1;
      if (event.key === "ArrowUp") shift = -1;
      const id = (selected[1] + shift) % searchList.length;
      setSelected([true, id]);
    }

    if (event.type === "mouseover" && event.clientX !== pos) {
      setSelected([true, index]);
      setPos(event.clientX);
    }
  };

  useEffect(() => {
    ref.current = ref.current.slice(0, searchList.length);
  }, [searchList]);

  useEffect(() => {
    scrollIntoView();
  }, [selected]);

  return searchList.length < 1 ? (
    <div className="customCard">No data found</div>
  ) : (
    searchList.map((card, index) => {
      return (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={`customCard ${
            selected[0] && selected[1] === index ? "activeClassName" : ""
          }`}
          onKeyDown={navigationHandler}
          onMouseOver={event => navigationHandler(event, index)}
          onFocus={event => navigationHandler(event, index)}
          tabIndex="0"
          role="button"
          ref={el => {
            ref.current[index] = el;
          }}
          id={index}
        >
          {Object.entries(card).map((item, idx) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={idx}>
                <HighlightSearch searchValue={searchValue} item={item[1]} />
              </div>
            );
          })}
        </div>
      );
    })
  );
};

DisplaySearch.propTypes = {
  searchList: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchValue: PropTypes.string.isRequired
};

export default DisplaySearch;
