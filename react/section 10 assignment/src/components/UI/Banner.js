import React, { useContext } from "react";
import "./Banner.css";
import CartContext from "./Functional/cart-context";

const Banner = (props) => {
  const ctx = useContext(CartContext);

  return (
    <div className="banner">
      <h1>{props.title}</h1>
      <div className="cart" onClick={props.onClick}>
        <p className="inline-display">Your Cart</p>
        <p className="inline-display cart-items">{ctx.totalNumOfItems}</p>
      </div>
    </div>
  );
};

export default Banner;
