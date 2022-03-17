import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const Tag = ({ colorStyle, value }) => {
  function capitalize(input) {
    var words = input.split(" ");
    var CapitalizedWords = [];
    words.forEach((element) => {
      CapitalizedWords.push(
        element[0].toUpperCase() + element.slice(1, element.length)
      );
    });
    return CapitalizedWords.join(" ");
  }
  return (
    <span className="tag" style={colorStyle}>
      {capitalize(value)}
    </span>
  );
};
Tag.prototype = {
  colorStyle: PropTypes.object,
  value: PropTypes.string,
};
export default Tag;
