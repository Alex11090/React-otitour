import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListTouristCards from "./components/tango/list-of-tourist-cards/ListTouristCards";
import TourDiscription from "./components/tango/tour-discription/TourDiscription";
import ItravelListTouristCards from "./components/itravel/itravel-list-of-tourist-card/ItravelListTouristCards";
import ItravelTourDiscription from "./components/itravel/itravel-tour-description/ItravelTourDescription";
import VidvTourDescription from "./components/vidviday/vidv-tour-description/VidvTourDescription";
import VidvidayListTouristCards from "./components/vidviday/vidv-list-of-tourist-cards/VidvidayListTouristCards";
import Header from "./components/header/header";
import AdriaticListTouristCards from "./components/adriatic/adriatic-list-of tourist-card/AdriaticListTouristCards";
import AdriaticTourDescription from "./components/adriatic/adriatic-tour-description/AdriaticTourDescription";
import AdriaticNoNightListTouristCards from "./components/adriatic-no-night/adriatic-no-night-list-of tour-card/AdriaticNoNightListTourCard";
import AdriaticNoNightTourDescription from "./components/adriatic-no-night/adriatic-no-night-tour-description/AdriaticNoNightTourDescription";
import AdriaticNewYearListTouristCards from "./components/adriatic-newYear/adriatic-newYear-list-of tour-card/AdriaticNewYearListTouristCards";
import AdriaticNewYearTourDescription from "./components/adriatic-newYear/adriatic-newYear-tour-description/AdriativNewYearTourDescription";
function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route
            exact
            path="/adriatic_new_year"
            element={<AdriaticNewYearListTouristCards />}
          />

          <Route exact path="/tango" element={<ListTouristCards />} />

          <Route
            exact
            path="/tango/tours/:title"
            element={<TourDiscription />}
          />
          <Route exact path="/itravel" element={<ItravelListTouristCards />} />
          <Route
            exact
            path="/itravel/description_tour/tours/:title"
            element={<ItravelTourDiscription />}
          />
          <Route
            exact
            path="/adriatic"
            element={<AdriaticListTouristCards />}
          />
          <Route
            exact
            path="/adriatic/description_tour/tours/:title"
            element={<AdriaticTourDescription />}
          />
          <Route
            exact
            path="/adriatic_no_night"
            element={<AdriaticNoNightListTouristCards />}
          />
          <Route
            exact
            path="/adriatic_no_night/description/tours/:title"
            element={<AdriaticNoNightTourDescription />}
          />
          <Route
            exact
            path="adriatic_new_year/description/tours/:title"
            element={<AdriaticNewYearTourDescription />}
          />
          <Route
            exact
            path="/vidviday"
            element={<VidvidayListTouristCards />}
          />
          <Route
            exact
            path="/vidviday/vidvidaydiscription/tours/:id"
            element={<VidvTourDescription />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
