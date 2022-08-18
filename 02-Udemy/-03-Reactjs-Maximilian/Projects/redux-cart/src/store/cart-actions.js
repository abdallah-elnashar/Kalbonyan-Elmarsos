import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-httpss-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("could not fetch cart data");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error",
          message: "fetching cart data failed",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "sending...",
          message: "sending cart data",
        })
      )
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-httpss-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("sending cart data failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success!",
          message: "sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error",
          message: "sent cart data failed",
        })
      );
    }
  };
};
