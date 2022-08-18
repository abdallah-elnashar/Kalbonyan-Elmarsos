import React, { useContext, useState } from "react";
import Checkout from "./CheckOut";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const CartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const CartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = (e) => {
    e.preventDefault();
    setIsCheckOut(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    await fetch(
      "https://react-httpss-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);

    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            amount={item.amount}
            name={item.name}
            price={item.price}
            onAdd={CartItemAddHandler.bind(null, item)}
            onRemove={CartItemRemoveHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  const modalContent = (
    <React.Fragment>
      {" "}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckOut && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>sending order data...</p>;
  const didSubmitModalContent = <p> successfully sent the order</p>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && didSubmit && didSubmitModalContent}
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && isSubmittingModalContent}
    </Modal>
  );
};

export default Cart;
