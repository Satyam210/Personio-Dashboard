import React from "react";
import PropTypes from "prop-types";
import "./index.css";
const Badge = ({ count }) => {
  return <span className="badge">{count}</span>;
};
Badge.propTypes = {
  count: PropTypes.number,
};
export default Badge;
