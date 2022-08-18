import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
const CartItem = (props) => {
  const dispatch = useDispatch();

  const { title, quantity, totalPrice, price, id } = props.item;

  const removeItemFromCart = () => {
    dispatch(cartActions.removeItemToCartHandler(id));
  };
  const addItemToCartHandler = () => {
    dispatch(cartActions.addItemToCartHandler({ title, price, id }));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemFromCart}>-</button>
          <button onClick={addItemToCartHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
