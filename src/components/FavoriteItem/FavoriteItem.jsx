import React, { useState } from "react";
import "./FavoriteItem.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

function FavoritesItem(props) {
  const dispatch = useDispatch();
  const gif = props.gif;
  const categories = useSelector((store) => store.categories);
  const [currentCategory, setCurrentCategory] = useState("category");

  const addCategory = (gifId, categoryId) => {
    axios
      .put(`/api/favorites/${gifId}`, { category: Number(categoryId) })
      .then((result) => {
        dispatch({ type: "FETCH_FAVORITES" });
      })
      .catch((error) => {
        console.log("error setting category", error);
        alert("Something went wrong");
      });
  };

  const removeFromFavorites = (id) => {
    axios
      .delete(`/api/favorites/${id}`)
      .then((result) => {
        dispatch({ type: "FETCH_FAVORITES" });
      })
      .catch((error) => {
        console.error(
          "Error in DELETE '/api/favorites/:id' - removeFromFavorites()",
          error
        );
        alert("Error in DELETE '/api/favorites/:id'. See console.");
      });
  };

  const returnName = (id) => {
    for (let category of categories) {
      if (category.id == id) {
        return category.name;
      }
    }
  };

  return (
    <Card
      className="gif-card"
      elevation={8}
      sx={{
        maxWidth: "300px",
        marginTop: "10px",
        marginBottom: "10px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <CardMedia
        component="img"
        image={gif.GIPHY_URL}
        alt={gif.GIPHY_Title}
        sx={{ maxHeight: "500px", minHeight: "300px" }}
      />
      <CardActions sx={{ textAlign: "center" }}>
        {gif.category_id == null ? (
          <p>{"Category unassigned"}</p>
        ) : (
          <p>{`Current category: ${returnName(gif.category_id)}`}</p>
        )}
        <Button
          aria-label="delete"
          onClick={() => removeFromFavorites(gif.id)}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
        <select
          id="category-select"
          onChange={(e) => addCategory(gif.id, e.target.value)}
          value={currentCategory}
        >
          <option disabled value="category">
            Pick Category
          </option>
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
      </CardActions>
    </Card>
  );
}
export default FavoritesItem;
