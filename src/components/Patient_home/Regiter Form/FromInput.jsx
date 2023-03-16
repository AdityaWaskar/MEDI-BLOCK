import "./fromInput.css";
import React, { Component, useState } from "react";
const FromInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputprops } = props;
  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="fromInputContainer">
      <label>{label}</label>
      <input
        {...inputprops}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FromInput;
