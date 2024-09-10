import UserIcon from "../../assets/images/user.png";
import overAllProjectIcon from "../../assets/images/Overall Projects.png";
// import draft from "../../Assets/images/draft.png";
// import newProjectIcon from "../../Assets/images/planning.png";
// import importDB from "../../Assets/images/database.png";
// import Users from "../../Assets/images/users.png";
import helpIcon from "../../assets/images/help.png";
// import CustomerImg from "../../Assets/images/customer.png";
import InhouseImg from "../../assets/images/reports.png";
import submitImg from "../../assets/images/Submitted Budget.png";
import budgetPlan from "../../assets/images/budgetPlan.png";
import { NavLink } from "react-router-dom";
import routePath from "../../routes/routePath";
import { decodeUser } from "../../services/auth";
import { useEffect, useState } from "react";
import { getUserAccessList } from "../../services/sidebarService";
// import { NavLink, useLocation } from "react-router-dom";
// import { mainRoutePaths } from "../../Routes/RoutePaths";
// import { decodeUser } from "../../constants/decryptToken.js";
// import jwtDecode from "jwt-decode";

const Sidebar = () => {
  const [isAccessUser, setIsAccesuser] = useState(false);

  console.log("isAccessUser", isAccessUser);

  const accessUser = [
    "devanshi.jadav@yopmail.com",
    "kishore@bluebinaries.com",
    "Venkatesh.Krishnan@bluebinaries.com",
    "sreekanth.mallampati@bluebinaries.com",
    "puttaiah.bellamkonda@bluebinaries.com",
    // "natesan.ramanathan@bluebinaries.com",
    // "pravin.s@bluebinaries.com",
  ];
  let tokenDetails = decodeUser();
  console.log("tokenDetails", tokenDetails);

  // let tokenDetails = decodeUser();
  // const location = useLocation();
  // const fromPage = location.state?.fromPage;
  // const queryParams = new URLSearchParams(location.search);
  // const type = queryParams.get("type");
  // console.log("ddd fromPage", fromPage);
  // console.log("ddd type", type);
  // console.log("ddd locationState", location.state);
  // let access = jwtDecode(localStorage.getItem("USER_ACCESS"));

  useEffect(() => {
    getUserAccessList()
      .then((res) => {
        console.log("res", res);
        if (res.status === 200 && res.data) {
          setIsAccesuser(res.data.userAccess?.super_access);
        }
      })
      .catch((err) => err);
  }, []);
  return (
    <div className="sidebar-container">
      <div className="sidebar-body">
        <div className="user-con">
          <img src={UserIcon} alt="user" />
          <span>{tokenDetails?.userFullName}</span>
          <span>{tokenDetails?.roleName}</span>
        </div>

        {/* <NavLink
          to={`${mainRoutePaths.root}?type=Customer`}
          className={({ isActive }) =>
            ((isActive && !fromPage) || fromPage === "customerProject") &&
            (type === "Customer" || !type)
              ? "active"
              : ""
          }
        >
          <div className="project-con">
            <img src={CustomerImg} alt="project" />
            <span>Customer Projects</span>
          </div>
        </NavLink> */}
        <NavLink to={routePath.home} >
          <div className="project-con">
            <img src={budgetPlan} alt="project" />
            <span>Plan The Budget</span>
          </div>
        </NavLink>
        <NavLink to={routePath.budgetView}>
          <div className="project-con">
            <img src={submitImg} alt="project" />
            <span>My Submitted Budget</span>
          </div>
        </NavLink>
        {/* {accessUser2.includes(tokenDetails.emailAddress) && (/ */}
        {isAccessUser===1 && (
          <NavLink to={routePath.allBudgetList}>
            <div className="project-con">
              <img src={InhouseImg} alt="project" />
              <span>Reports</span>
            </div>
          </NavLink>
        )}
        {/* <div className="project-con">
          <img src={helpIcon} alt="project" />
          <span>System User Guide</span>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
