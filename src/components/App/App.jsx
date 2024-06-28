import { HashRouter as Router, Route } from "react-router-dom";
import Favorites from "../Favorites/Favorites";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import React from "react";
import Search from "../Search/Search";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

function App() {
  return (
    <div
      style={{ backgroundColor: "black", color: "white", minHeight: "100vh" }}
    >
      <Typography
        style={{
          fontSize: "50px",
          fontFamily: "Roboto",
          textAlign: "center",
          fontWeight: "bold",
          color: "white",
        }}
      >
        Giphy Search!
      </Typography>
      <Router>
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "75px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <ul
              style={{
                display: "flex",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              <li style={{ marginRight: "50px" }}>
                <Button component={Link} to="/" variant="contained">
                  Search
                </Button>
              </li>
              <li>
                <Button component={Link} to="/favorites" variant="contained">
                  Favorites
                </Button>
              </li>
            </ul>
          </div>
        </nav>
        <Route exact path="/">
          <Search />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
      </Router>
    </div>
  );
}

export default App;
