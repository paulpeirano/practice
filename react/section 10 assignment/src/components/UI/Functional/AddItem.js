import React, { useContext, useState } from "react";
import "./AddItem.css";
import CartContext from "./cart-context";

const AddItem = (props) => {
  const ctx = useContext(CartContext);
  const [totalToAdd, setTotalToAdd] = useState(1);
  let { setTotalNumOfItems, setTotal } = ctx;

  function handleAddItem() {
    props.onClick((prev) => prev + totalToAdd);
    console.log(ctx);
    setTotalNumOfItems((prev) => prev + totalToAdd);
    setTotalToAdd(1);
    setTotal((prev) =>
      parseFloat((prev + props.itemPrice * totalToAdd).toFixed(2))
    );
  }

  function handleChange(event) {
    setTotalToAdd(parseInt(event.target.value));
    console.log(totalToAdd);
  }

  return (
    <div className="addItem">
      <div>
        <label className="addItem-label" htmlFor={props.id}>
          Amount
        </label>
        <input
          id={props.id}
          type={"number"}
          className={"addItem-input"}
          min={1}
          onChange={handleChange}
          value={totalToAdd}
        ></input>
      </div>
      <button className="addItem-btn" type="button" onClick={handleAddItem}>
        + Add
      </button>
    </div>
  );
};

export default AddItem;
