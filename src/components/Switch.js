import React from "react";
import "./Switch.scss";
const Switch = ({ checked = false, onChange = () => {} }) => {
  return (
    <>
      <input
        onChange={(e) => onChange(e.currentTarget.checked)}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        checked={checked}
      />
      <label className="react-switch-label" htmlFor={`react-switch-new`}>
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;
