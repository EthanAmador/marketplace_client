import React from "react";
import { Link } from "react-router-dom";
import iconMarket from "../images/Market_Principal.svg";
import iconShopping from "../images/Sopping.svg";
import productNew from "../images/productNew.svg"

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <img className="Principal_logo" src={iconMarket} alt="logo" />
        </Link>
        <div className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
          <Link to="/create" className="navbar-brand">
          <img className="Principal_logo" src={productNew} alt="Shopping cart" />
          </Link>
          <Link to="/marketlist" className="navbar-brand">
            <img className="Principal_logo" src={iconShopping} alt="Shopping cart" />
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
