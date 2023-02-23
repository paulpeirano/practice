import React from "react";
import "./CartModalItem.css";

const CartModalItem = (props) => {
  const handleAdd = () => {
    props.onAdd((prev) => prev + 1);
    props.setTotalNumOfItems((prev) => prev + 1);
    props.setTotal((prev) => parseFloat((prev + props.itemPrice).toFixed(2)));
  };

  const handleReduce = () => {
    if (props.totalNumOfItems >= 1) {
      props.onReduce((prev) => prev - 1);
      props.setTotalNumOfItems((prev) => prev - 1);
      props.setTotal((prev) => parseFloat((prev - props.itemPrice).toFixed(2)));
    }
  };

  return (
    <div>
      <div className="flex-display">
        <div>
          <h3>{props.title}</h3>
          <p className="price">{`$${props.itemPrice}`}</p>
          <p className="qty">{`x ${props.orderedAmount}`}</p>
        </div>
        <div className="buttons">
          <button className="button-inverted-mini" onClick={handleReduce}>
            -
          </button>
          <button className="button-inverted-mini" onClick={handleAdd}>
            +
          </button>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default CartModalItem;
