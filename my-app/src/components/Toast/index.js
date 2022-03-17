import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "./index.scss";

const Toast = ({ open, type, message, duration, onClose }) => {
  useEffect(() => {
    open && setTimeout(() => onClose && onClose(), duration);
  }, [open, duration, onClose]);

  return (
    open && (
      <div className={"toast"}>
        <span className={type === "success" ? "success" : "error"}>
          {message}
        </span>
      </div>
    )
  );
};

Toast.propTypes = {
  open: PropTypes.bool,
  type: PropTypes.oneOf(["success", "error"]),
  message: PropTypes.string,
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

Toast.defaultProps = {
  open: false,
  type: "error",
  duration: 5000,
};

export default Toast;
