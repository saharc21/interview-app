import { Route, Routes as RoutesCore, useLocation } from "react-router-dom";
import AboutMe from "../components/AboutMe/AboutMe";
import Home from "../components/Home";
import MyPortfolio from "../components/MyPortfolio";
import PersonDetails from "../components/PersonDetails/PersonsDetails";
import { ReCounter } from "../components/Counter/ReCounter";
import Counter from "../components/Counter/Counter";
// import { AnimatePresence } from "framer-motion";

export enum RoutePaths {
  Home = "/",
  AboutMe = "/about",
  MyPortfolio = "/my-portfolio",
  CounterByHooks = "/my-portfolio/counter",
  CounterByRedux = "/my-portfolio/counter-with-redux",
  FetchDataByAxios = "/my-portfolio/person-details",
}

const Routes = () => {
  const location = useLocation();

  return (
    <RoutesCore location={location} key={location.pathname}>
      <Route path={RoutePaths.Home} element={<Home />} />
      <Route path={RoutePaths.AboutMe} element={<AboutMe />} />
      <Route path={RoutePaths.MyPortfolio} element={<MyPortfolio />} />
      <Route path={RoutePaths.CounterByHooks} element={<Counter />} />
      <Route path={RoutePaths.CounterByRedux} element={<ReCounter />} />
      <Route path={RoutePaths.FetchDataByAxios} element={<PersonDetails />} />
    </RoutesCore>
  );
};

export default Routes;
