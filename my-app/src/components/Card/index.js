import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const Card = ({ header, body, style = "cardStyle", headerStyle }) => {
  return (
    <section className={style} style={headerStyle}>
      {header && <header>{header}</header>}
      {body}
    </section>
  );
};
Card.propTypes = {
  header: PropTypes.node,
  body: PropTypes.node,
  style: PropTypes.object,
  headerStyle: PropTypes.object,
};

export default Card;
