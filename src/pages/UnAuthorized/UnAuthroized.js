import React, { useEffect, useState } from "react";
import UnAuthorized from "../../assets/images/un_authroized.png";

let interval;
function UnAuthroized() {
  let [seconds, setSeconds] = useState(5);

  useEffect(() => {
    interval = setInterval(() => {
      setSeconds(seconds--);
      if (seconds < 0) {
        window.location.href = process.env.REACT_APP_V3_URL;
      }
    }, 1000);
  }, []);
  return (
    <div className="page-not-found">
      <div className="page-not-found-container">
        <img src={UnAuthorized} alt={UnAuthorized.imgName} />
        <p>
          We're sorry, but you do not have permission to access this page.
          Redirect in {seconds} seconds.
        </p>
      </div>
    </div>
  );
}

export default UnAuthroized;
