import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import CommonOutlet from "../components/CommonOutlet/CommonOutlet";
import routePath from "./routePath";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import BudgetView from "../components/Bbninary/BudgetView/BudgetView";
import Authentication from "../components/Bbninary/Authentication/Authentication";
import UnAuthroized from "../components/Bbninary/UnAuthorized/UnAuthroized";
import PageNotFound from "../components/Bbninary/PageNotFound/PageNotFound";
import AllBudgetList from "../components/Bbninary/AllBudgetList/AllBudgetList";

const AppRoutes = () => {
  useEffect(() => {
    const getLocalStorageValue = localStorage.getItem("theme-mode");
    console.log("dd getLocalStorageValue", getLocalStorageValue);

    if (
      getLocalStorageValue === "light-mode" ||
      getLocalStorageValue === null
    ) {
      document.getElementsByTagName("body")[0].classList.add("light-theme");
      document.getElementsByTagName("body")[0].classList.remove("dark-theme");
    } else {
      document.getElementsByTagName("body")[0].classList.add("dark-theme");
      document.getElementsByTagName("body")[0].classList.remove("light-theme");
    }
  }, []);
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path={routePath.auth} element={<Authentication />} />
        <Route path={routePath.unAuthorized} element={<UnAuthroized />} />

        <Route
          element={
            <PrivateRoutes>
              <CommonOutlet />
            </PrivateRoutes>
          }
        >
          <Route path={routePath.root} element={<Home />} />
          <Route path={routePath.home} element={<Home />} />
          <Route path={routePath.budgetView} element={<BudgetView />} />
          <Route path={routePath.allBudgetList} element={<AllBudgetList />} />
          {/* <Route path={routePath.about} element={<About />} />
          <Route path={routePath.contact} element={<Contact />} /> */}
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
