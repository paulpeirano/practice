import React from "react";
import "./User.css";

const User = (props) => {
  return (
    <p className="user">
      {props.username + " (" + props.userAge + " years old)"}
    </p>
  );
};
export default User;
