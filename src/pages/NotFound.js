import React from "react";
import pageNotFound from "../images/404.svg";

function NotFound() {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <img className="FileNotFound_logo" src={pageNotFound} alt="logo" />
          <h1>Page not Found</h1>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
