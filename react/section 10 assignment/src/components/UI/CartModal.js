import Card from "./Card";
import "./Card.css";
import React from "react";

const CartModal = (props) => {
  return <Card class={props.class}>{props.children}</Card>;
};

export default CartModal;
