import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartContent = useSelector((state) => state.cart.items);

  const cartProducts = cartContent.map((product) => (
    <CartItem
      key={product.id}
      item={{
        key: product.id,
        title: product.title,
        quantity: product.quantity,
        price: product.price,
        id: product.id,
        totalPrice: product.totalPrice,
      }}
    />
  ));

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{cartProducts}</ul>
    </Card>
  );
};

export default Cart;
