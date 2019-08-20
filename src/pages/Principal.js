import React from "react";
import List from "./List";
import "../styles/style.css";

class Principal extends React.Component {
  render() {
    return (
      <div className="container">
        <List/>
      </div>
    );
  }
}

export default Principal;
