import React from "react";
import ErrorModal from "./ErrorModal";
import "./ModalBackdrop.css";

const ModalBackdrop = (props) => {
  if (props.isVisible) {
    return (
      <div onClick={props.onClick}>
        <ErrorModal
          isVisible={props.isVisible}
          message={props.message}
          onClick={props.onClick}
        />
      </div>
    );
  }
};

export default ModalBackdrop;
