// import { getUserIdToken } from "Storage/UserTokenStorage";
import { Link } from "react-router-dom";
// import NotFound from "../../assets/images/no-widget-added.png";
import NotFound from "../../../assets/images/no-widget-added.jpg";
import React from "react";
import routePath from "../../../routes/routePath";

function PageNotFound() {
  //    const userIdToken = getUserIdToken();
  return (
    <div className="page-not-found">
      <div className="page-not-found-container">
        <img src={NotFound} alt={NotFound.imgName} />
        <p>
          Oops! It looks like you've stumbled upon a page that doesn't exist.
        </p>
        <Link to={routePath?.home}>Back to Overall Projects</Link>
        {/* <Link to={`${userIdToken ? "/dashboard" : "/"}`}>
               Go Back to {userIdToken === null ? "Login" : "Dashboard"}
            </Link> */}
      </div>
    </div>
  );
}

export default PageNotFound;
