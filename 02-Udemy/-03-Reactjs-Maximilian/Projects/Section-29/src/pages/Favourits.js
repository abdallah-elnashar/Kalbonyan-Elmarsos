import { useContext } from "react";
import MeetupList from "../components/meetups/MeetupList";
import FavouritesContext from "../store/favorites-context";
const FavouritesPage = () => {
  const favoriteCtx = useContext(FavouritesContext);
  let content;

  if (favoriteCtx.totalFavourites === 0) {
    content = <p>you not have Favourites yet</p>;
  } else {
    content = <MeetupList meetups={favoriteCtx.favourites} />;
  }

  return (
    <section>
      <h1>My Favourites</h1>
      {content}
    </section>
  );
};

export default FavouritesPage;
