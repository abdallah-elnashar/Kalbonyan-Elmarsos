import React, { useContext, Fragment } from "react";
import Auth from "./components/Auth";
import Ingredients from "./components/Ingredients/Ingredients";
import { AuthContext } from "./context/auth-context";

const App = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      {authCtx.isAuth && <Ingredients />}
      {!authCtx.isAuth && <Auth />}
    </Fragment>
  );
};

export default App;
