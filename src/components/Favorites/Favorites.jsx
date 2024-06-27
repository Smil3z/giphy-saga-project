import "./Favorites.css";
import FavoriteList from "../FavoriteList/FavoriteList";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import * as React from "react";

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
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Typography style={{ fontSize: 25, marginRight: "10px" }}>
          Filter:
        </Typography>
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
      </div>
      <hr />
      <br />
      <FavoriteList />
    </div>
  );
}
export default Favorites;
