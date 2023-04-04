import React from "react";
import "./filter.css";

const Filter = (props) => {
  return (
    <div className="filter_container">
      <span>filter</span>
      <input
        type="date"
        name=""
        id=""
        value={props.lowerLimit}
        className="upper_limit limits"
        onChange={(e) => {
          props.setLowerLimit(e.target.value);
        }}
      />
      <input
        type="date"
        name=""
        id=""
        value={props.higherLimit}
        className="lower_limit limits"
        onChange={(e) => {
          props.setHigherLimit(e.target.value);
        }}
      />
    </div>
  );
};

export default Filter;
