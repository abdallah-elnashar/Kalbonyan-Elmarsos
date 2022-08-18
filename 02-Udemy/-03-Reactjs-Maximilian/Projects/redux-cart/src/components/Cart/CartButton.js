import classes from "./CartButton.module.css";
import { useSelector } from "react-redux";
const CartButton = (props) => {
  const cartItemsNumber = useSelector((state) => state.cart.totalQuantity);
  return (
    <button onClick={props.onToggle} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItemsNumber}</span>
    </button>
  );
};

export default CartButton;
