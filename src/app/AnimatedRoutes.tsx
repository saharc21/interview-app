// import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AboutMe from "../components/AboutMe";
import Home from "../components/Home";
import MyPortfolio from "../components/MyPortfolio";
import PersonDetails from "../components/PersonsDetails";
import { ReCounter } from "../components/Counter/ReCounter";
import Counter from "../components/Counter/Counter";
import { RoutePaths } from "./common";
// import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path={RoutePaths.Home} element={<Home />} />
      <Route path={RoutePaths.AboutMe} element={<AboutMe />} />
      <Route path={RoutePaths.MyPortfolio} element={<MyPortfolio />} />
      <Route path={RoutePaths.CounterByHooks} element={<Counter />} />
      <Route path={RoutePaths.CounterByRedux} element={<ReCounter />} />
      <Route path={RoutePaths.FetchDataByAxios} element={<PersonDetails />} />
    </Routes>
  );
};

export default AnimatedRoutes;
