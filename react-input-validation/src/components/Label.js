import React from "react";
import "./Label.css";

const Label = (props) => {
  return (
    <label className="label" htmlFor={props.labelFor}>
      {props.label}
    </label>
  );
};

export default Label;
