import React from "react";
import "./ErrorModal.css";
import Button from "./Button";

const ErrorModal = (props) => {
  if (props.isVisible) {
    return (
      <div className="error-modal">
        <h2>Invalid input</h2>
        <p>{props.message}</p>
        <Button onClick={props.onClick} text="OK" />
      </div>
    );
  }
};

export default ErrorModal;
