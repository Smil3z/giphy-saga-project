import React from "react";
import "./FavoriteList.css";
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import { useSelector } from "react-redux";

function FavoritesList(props) {
  const favorites = useSelector((store) => store.favorites);
  return (
    <div id="favorites-list">
      {favorites.map((gif) => {
        return <FavoriteItem key={gif.id} gif={gif} />;
      })}
    </div>
  );
}
export default FavoritesList;
