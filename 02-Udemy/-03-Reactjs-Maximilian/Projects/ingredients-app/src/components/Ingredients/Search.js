import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import Card from "../UI/Card";
import "./Search.css";
import ErrorModal from "../UI/ErrorModal";

const Search = React.memo((props) => {
  const { onLoadingIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const { isLoading, error, data, sendRequest, clear } = useHttp();

  useEffect(() => {
    const query =
      enteredFilter.length === 0
        ? ""
        : `?orderBy="title"&equalTo="${enteredFilter}"`;

    sendRequest(
      "https://react-httpss-default-rtdb.firebaseio.com/ingredients.json" +
        query,
      "GET"
    );
  }, [sendRequest, enteredFilter]);
  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      onLoadingIngredients(loadedIngredients);
    }
  }, [isLoading, data, error, onLoadingIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
