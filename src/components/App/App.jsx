import { HashRouter as Router, Route } from "react-router-dom";
import Favorites from "../Favorites/Favorites";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import React, { useState } from "react";
import Search from "../Search/Search";
import { Typography } from "@mui/material";

function App() {
  return (
    <div>
      <Typography
        style={{
          fontSize: "50px",
          fontFamily: "Roboto",
          Helvetica: "Arial",
          textAlign: "center",
          fontWeight: "bold",
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
            height: "100px",
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
              <Link to="/">Search</Link>
            </li>
          </ul>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>
        <hr />
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
