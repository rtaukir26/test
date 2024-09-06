import React from "react";
import { Loader } from "../../utils/Images";

function LoaderCommon() {
  return (
    <div className="loading-common">
      <img src={Loader.imgFile} alt={Loader.imgName} />
      <span>Loading</span>
    </div>
  );
}

export default LoaderCommon;
