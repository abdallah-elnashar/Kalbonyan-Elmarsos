import { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import FavouritesContext from "../../store/favorites-context";
const MainNavigation = () => {
  const favoriteCtx = useContext(FavouritesContext);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Meetups</Link>
          </li>

          <li>
            <Link to="/new-meetup">New Meetup</Link>
          </li>

          <li>
            <Link to="/favourites">My Favourites</Link>
            <span className={classes.badge}>{favoriteCtx.totalFavourites}</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
