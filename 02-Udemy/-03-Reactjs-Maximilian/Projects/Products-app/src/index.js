import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./hooks-store/products-store";
import { BrowserRouter } from "react-router-dom";
import ProductsProvider from "./context/products-context";
import "./index.css";
import App from "./App";

configureStore();
ReactDOM.render(
  <ProductsProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProductsProvider>,
  document.getElementById("root")
);
