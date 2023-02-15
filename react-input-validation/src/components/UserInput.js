import React from "react";
import "./UserInput.css";

const UserInput = (props) => {
  return (
    <input
      className="user-input"
      type={props.type}
      id={props.id}
      onChange={props.onChange}
      value={props.value}
    ></input>
  );
};

export default UserInput;
