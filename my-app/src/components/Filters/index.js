import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const Filter = ({ filters, inputHandler, onSubmit, onReset, isDisabled }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="formstyle">
          <label>
            Name:
            <input
              className="inputStyle"
              name="name"
              value={filters.name}
              onChange={(e) => inputHandler(e)}
              placeholder="Search by Name"
            />
          </label>

          <label>
            Position Applied:
            <input
              className="inputStyle"
              value={filters.position}
              name="position"
              onChange={(e) => inputHandler(e)}
              placeholder="Search by Position Applied"
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={filters.status}
              onChange={(e) => inputHandler(e)}
              style={{ width: 250, margin: 5, height: 32 }}
            >
              {!filters.status && <option value="">Choose status</option>}
              <option value={"approved"}>Approved</option>
              <option value={"waiting"}>Waiting</option>
              <option value={"rejected"}>Rejected</option>
            </select>
          </label>
        </div>
        <div className="buttonStyle">
          <input type="submit" className="submitButton" disabled={isDisabled} />
          <input
            onClick={onReset}
            className="clearButton"
            type="reset"
            disabled={isDisabled}
          />
        </div>
      </form>
    </>
  );
};

Filter.propTypes = {
  filters: PropTypes.object,
  inputHandler: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default React.memo(Filter);
