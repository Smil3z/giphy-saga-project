import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// Creating rootSaga for all Sagas to be called
function* rootSaga() {
  yield takeEvery("FETCH_CATEGORIES", fetchCategories);
  yield takeEvery("FETCH_FAVORITES", fetchFavorites);
  yield takeEvery("FETCH_SEARCH_RESULTS", fetchSearchResults);
  yield takeEvery("FETCH_FILTERED_FAVORITES", filterFavorites);
  yield takeEvery("ADD_FAVORITE", addFavorite);
}

// ----------------------------
// Sagas
// ----------------------------

function* fetchCategories() {
  // Get categories from DB
  try {
    const categoryResults = yield axios.get("/api/categories");
    yield put({
      type: "SET_CATEGORIES",
      payload: categoryResults.data,
    });
  } catch (error) {
    console.error("Error in GET '/category' - Saga fetchCategories()", error);
    alert("Error in GET '/category'. See console.");
  }
}

function* fetchFavorites() {
  // Get favorites from DB
  try {
    const favoriteResults = yield axios.get("/api/favorites");
    yield put({
      type: "SET_FAVORITES",
      payload: favoriteResults.data,
    });
  } catch (error) {
    console.error("Error in GET '/favorite' - Saga fetchFavorites()", error);
    alert("Error in GET '/favorite'. See console.");
  }
}

function* fetchSearchResults(action) {
  // Get search results
  try {
    const favoriteResults = yield axios.get("/api/search", action.payload);
    yield put({
      type: "SET_SEARCH_RESULTS",
      payload: favoriteResults.data,
    });
  } catch (error) {
    console.error("Error in GET '/search' - Saga fetchSearchResults()", error);
    alert("Error in GET '/search'. See console.");
  }
}

function* addFavorite(action) {
  try {
    yield axios.post("/api/favorites", action.payload);
    yield put({ type: "FETCH_FAVORITES" });
  } catch (error) {
    console.error("Error adding favorite", error);
    alert("Something Went Wrong!");
  }
}

function* filterFavorites(action) {
  try {
    if (action.payload == "all") {
      yield put({ type: "FETCH_FAVORITES" });
    } else {
      const results = yield axios.get(`/api/favorites/${action.payload}`);
      yield put({ type: "SET_FAVORITES", payload: results.data });
    }
  } catch (error) {
    console.error("Error filtering favorites", error);
    alert("Something Went Wrong!");
  }
}
// ----------------------------
// End Sagas
// ----------------------------

// Saga middleware created
const sagaMiddleware = createSagaMiddleware();

// ----------------------------
// Reducers
// ----------------------------

const categories = (state = [], action) => {
  // Holds all categories in an array
  switch (action.type) {
    case "SET_CATEGORIES":
      return action.payload;
    default:
      return state;
  }
};

const favorites = (state = [], action) => {
  // Holds all favorites in an array
  switch (action.type) {
    case "SET_FAVORITES":
      return action.payload;
    default:
      return state;
  }
};

const searchResults = (state = [], action) => {
  // Holds all search results in an array
  switch (action.type) {
    case "SET_SEARCH_RESULTS":
      return action.payload;
    default:
      return state;
  }
};

// ----------------------------
// End Reducers
// --------------------------------

// Creating store for reducers
const store = createStore(
  combineReducers({
    categories,
    favorites,
    searchResults,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

// rootSaga sent to middleware
sagaMiddleware.run(rootSaga);

// Creating root
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering wrapped in a provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
