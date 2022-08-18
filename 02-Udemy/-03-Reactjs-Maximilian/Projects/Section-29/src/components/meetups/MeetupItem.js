import { useContext } from "react";
import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import FavouritesContext from "../../store/favorites-context.js";

const MeetupItem = (props) => {
  const favoriteCtx = useContext(FavouritesContext);

  const isFavourite = favoriteCtx.itemIsFavourite(props.id);

  const toggleFavouriteHandler = () => {
    if (isFavourite) {
      favoriteCtx.removeFavourite(props.id);
    } else {
      favoriteCtx.addFavourite({
        title: props.title,
        id: props.id,
        description: props.description,
        address: props.address,
        image: props.image,
      });
    }
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt="" />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavouriteHandler}>
            {isFavourite ? "remove from Favourite" : "Add to favourites"}
          </button>
        </div>
      </Card>
    </li>
  );
};

export default MeetupItem;
