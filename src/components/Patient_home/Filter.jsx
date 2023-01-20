import React from "react";
import "./filter.css";

const Filter = () => {
  return (
    <div className="filter_container">
      <span>filter</span>
      <input
        type="date"
        name=""
        id=""
        value={"2023-01-02"}
        className="upper_limit limits"
      />
      <input
        type="date"
        name=""
        id=""
        value={"2023-01-04"}
        className="lower_limit limits"
      />
    </div>
  );
};

export default Filter;
