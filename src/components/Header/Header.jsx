import React, { useState } from "react";
import brandLogo from "../../assets/images/brandLogo.png";
import toolName from "../../assets/images/BudgetPlannerLogo.png";
import user from "../../assets/images/user.png";
import { Link } from "react-router-dom";
import bell from "../../assets/images/notification.png";
const Header = () => {
  let theme = localStorage.getItem("theme-mode");
  const [isLightTheme, setIsLightTheme] = useState(
    theme === "dark-mode" ? false : true
  );

  const handleClickToggle = () => {
    setIsLightTheme(!isLightTheme);
    const body = document.getElementsByTagName("body")[0];
    if (isLightTheme) {
      body.classList.add("dark-theme");
      body.classList.remove("light-theme");
      localStorage.setItem("theme-mode", "dark-mode");
      setIsLightTheme(false);
    } else {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      localStorage.setItem("theme-mode", "light-mode");
      setIsLightTheme(true);
    }
  };
  return (
    <div className="main-header">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid custom-header-con">
          <div className="left">
            <Link to="/" class="navbar-brand">
              <img src={brandLogo} alt="logo" />
            </Link>
          </div>

          <div className="right">
            <div className="project-container">
              {/* <span>Budget Planner</span> */}
              <img className="toolName" src={toolName} alt="tool" />
            </div>

            {/* <div className="toggle-con" onClick={handleClickToggle}>
              <div
                className="toggle-ball"
                style={{
                  transform: isLightTheme
                    ? "translateX(5px)"
                    : "translateX(65px)",
                }}
              ></div>
            </div> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
