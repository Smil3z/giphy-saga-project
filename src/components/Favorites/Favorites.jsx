import React from "react";
import "./Favorites.css";
import FavoriteList from "../FavoriteList/FavoriteList";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function Favorites() {
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState("all");
  const categories = useSelector((store) => store.categories);

  useEffect(() => {
    dispatch({ type: "FETCH_FAVORITES" });
    dispatch({ type: "FETCH_CATEGORIES" });
  }, []);

  const handleCategoryChange = (e) => {
    dispatch({ type: "FETCH_FILTERED_FAVORITES", payload: e.target.value });
    setCurrentCategory(e.target.value);
  };

  return (
    <div id="favorites-page">
      <h5>Filter by favorites by category:</h5>
      <select
        id="category-select"
        onChange={handleCategoryChange}
        value={currentCategory}
      >
        <option value="all">All</option>
        {categories.map((category) => {
          return (
            <option
              key={category.id}
              className="category-option"
              value={category.id}
            >
              {category.name}
            </option>
          );
        })}
      </select>
      <hr />
      <br />
      <FavoriteList />
    </div>
  );
}
export default Favorites;
