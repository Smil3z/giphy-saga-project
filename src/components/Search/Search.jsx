import React, { useState } from "react";
import "./Search.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";

const API_KEY = "YASEDgFgiSaJLWJEYAraiXsmLJ86SUXz";

function Search() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function sendSearch(e) {
    e.preventDefault();
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
      )
      .then((response) => {
        setSearchResults(response.data.data);
        setSearchTerm("");
      })
      .catch((err) => {
        console.log("search error", err);
        alert("Something went wrong!");
      });
  }

  // Function for adding a giphy to favorites
  function handleClick(gif) {
    // ID provided by GIPHY
    let favorite = {
      link: gif.images.fixed_height.url,
      title: gif.title,
      ID: gif.id,
    };
    dispatch({ type: "ADD_FAVORITE", payload: favorite });
  }

  return (
    <div>
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <form style={{ left: "50" }}>
          <input
            style={{ height: "30px" }}
            placeholder="Search GIPHY"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={sendSearch} variant="contained">
            Submit
          </Button>
        </form>
      </div>
      <br />
      <hr />
      <br />
      <div id="search-display">
        {searchResults.map((item, i) => (
          <Card
            key={i}
            className="gif-card"
            elevation={8}
            sx={{
              margin: "auto",
              maxWidth: "300px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <CardMedia
              component="img"
              image={item.images.fixed_height.url}
              alt={item.title}
              sx={{
                maxHeight: "500px",
                minHeight: "300px",
              }}
            />
            <CardActions
              sx={{ textAlign: "center", backgroundColor: "purple" }}
            >
              <Button
                variant="contained"
                aria-label="delete"
                onClick={() => handleClick(item)}
              >
                Add to Favorites
                <FavoriteIcon variant="filled" sx={{ color: "darkred" }} />
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Search;
