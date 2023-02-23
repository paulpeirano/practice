import "./App.css";
import Banner from "./components/UI/Banner";
import React, { useState } from "react";
import Card from "./components/UI/Card";
import Item from "./components/UI/Functional/Item";
import AddItem from "./components/UI/Functional/AddItem";
import CartContext from "./components/UI/Functional/cart-context";
import Backdrop from "./components/UI/Backdrop";
import CartModal from "./components/UI/CartModal";
import CartModalItem from "./components/UI/Functional/CartModalItem";
import ReactDOM from "react-dom";

function App() {
  const [sushiOrdered, setSushiOrdered] = useState(0);
  const [schnitzelOrdered, setSchnitzelOrdered] = useState(0);
  const [burgerOrdered, setBurgerOrdered] = useState(0);
  const [bowlOrdered, setBowlOrdered] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalNumOfItems, setTotalNumOfItems] = useState(0);
  const [shouldShowBackdrop, setShouldShowBackdrop] = useState(false);
  const [shouldShowModal, setShouldShowModal] = useState(false);

  let items = [
    {
      name: "Sushi",
      description: "Finest fish and veggies",
      price: 22.99,
      onClick: setSushiOrdered,
      ordered: sushiOrdered,
    },
    {
      name: "Schnitzel",
      description: "A German specialty!",
      price: 16.5,
      onClick: setSchnitzelOrdered,
      ordered: schnitzelOrdered,
    },
    {
      name: "Barbecue Burger",
      description: "American, raw, meaty",
      price: 12.99,
      onClick: setBurgerOrdered,
      ordered: burgerOrdered,
    },
    {
      name: "Green bowl",
      description: "Healthy...and green...",
      price: 18.99,
      onClick: setBowlOrdered,
      ordered: bowlOrdered,
    },
  ];

  const toggleModalAndBackdrop = () => {
    setShouldShowBackdrop((prev) => !prev);
    setShouldShowModal((prev) => !prev);
  };

  const order = () => {
    console.log("Ordering...");
  };

  return (
    <CartContext.Provider
      value={{
        sushiOrdered: sushiOrdered,
        schnitzelOrdered: schnitzelOrdered,
        burgerOrdered: burgerOrdered,
        bowlOrdered: bowlOrdered,
        totalNumOfItems: totalNumOfItems,
        total: total,
        setTotalNumOfItems: setTotalNumOfItems,
        setTotal: setTotal,
      }}
    >
      {shouldShowBackdrop &&
        ReactDOM.createPortal(
          <Backdrop onClick={toggleModalAndBackdrop} />,
          document.getElementById("backdrop-root")
        )}
      {shouldShowModal &&
        ReactDOM.createPortal(
          <CartModal class={"card-white-modal"}>
            {items
              .filter((item) => {
                return item.ordered > 0;
              })
              .map((item) => {
                return (
                  <CartModalItem
                    key={Math.random()}
                    title={item.name}
                    itemPrice={item.price}
                    orderedAmount={item.ordered}
                    onAdd={item.onClick}
                    onReduce={item.onClick}
                    setTotal={setTotal}
                    setTotalNumOfItems={setTotalNumOfItems}
                    total={total}
                    totalNumOfItems={totalNumOfItems}
                  />
                );
              })}
            <div>
              <h3>Total Amount</h3>
              <h3>{`$${total}`}</h3>
              <button
                className="button-inverted"
                onClick={toggleModalAndBackdrop}
              >
                Close
              </button>
              <button className="button" onClick={order}>
                Order
              </button>
            </div>
          </CartModal>,
          document.getElementById("modal-root")
        )}
      <Banner
        title={"ReactMeals"}
        cartItemNumber={0}
        onClick={toggleModalAndBackdrop}
      />
      <div className="background-image">
        <Card class={"card"}>
          <h1>Delicious Food, Delivered To You</h1>
          <p>
            Choose your favourite meal from our broad selection of available
            meals and enjoy a delicious lunch or dinner at home.
          </p>
          <p>
            All our meals are cooked with high-quality ingredients, just-in-time
            and of course by experienced chefs!
          </p>
        </Card>
      </div>
      <Card class={"card-white"}>
        {items.map((item) => {
          return (
            <Item
              key={Math.random()}
              itemName={item.name}
              itemDescription={item.description}
              itemPrice={item.price}
              onClick={item.onClick}
            />
          );
        })}
      </Card>
    </CartContext.Provider>
  );
}

export default App;
