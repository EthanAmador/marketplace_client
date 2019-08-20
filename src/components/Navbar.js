import React from "react";
import { Link } from "react-router-dom";
import iconMarket from "../images/Market_Principal.svg";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <img className="Principal_logo" src={iconMarket} alt="logo" />
        </Link>
        <Link to="/create" className="btn btn-primary">create product</Link>
      </nav>
    );
  }
}

export default Navbar;
