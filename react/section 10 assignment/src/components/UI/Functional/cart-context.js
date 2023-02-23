import React from "react";

const CartContext = React.createContext({
  sushiOrdered: 0,
  schnitzelOrdered: 0,
  burgerOrdered: 0,
  bowlOrdered: 0,
  totalNumOfItems: 0,
  total: 0,
});

export default CartContext;
