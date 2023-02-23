import React from "react";
import AddItem from "./AddItem";
import "./Item.css";

const Item = (props) => {
  return (
    <React.Fragment>
      <div className="item">
        <h3>{props.itemName}</h3>
        <p>{props.itemDescription}</p>
        <p>{`$${props.itemPrice}`}</p>
      </div>
      <AddItem
        id={props.itemName.toLowerCase()}
        itemPrice={props.itemPrice}
        onClick={props.onClick}
      />
      <hr></hr>
    </React.Fragment>
  );
};

export default Item;
