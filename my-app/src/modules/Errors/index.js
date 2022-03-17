import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import "./index.scss";

const Errors = ({ codeProp }) => {
  let { code } = useParams();
  let navigate = useNavigate();
  code = code || codeProp || "404";

  const getProps = () => {
    let obj = {};
    if (code === "404") {
      obj = {
        title: "Page Not Found!",
      };
    } else if (parseInt(code, 10) >= 500) {
      obj = {
        title: "Uh-oh! Something went wrong.",
      };
    } else {
      obj = {
        title: "No Internet",
      };
    }
    return obj;
  };

  return (
    <>
      <nav>
        <div className="errors">
          <div>
            <h2>{getProps().title}</h2>

            <button
              className="button"
              onClick={() => {
                navigate("/");
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

Errors.propTypes = {
  codeProp: PropTypes.string,
};

export default Errors;
