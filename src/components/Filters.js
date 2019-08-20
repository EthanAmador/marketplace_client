import React from "react";
import { Combobox } from "react-widgets";

class Filters extends React.Component {
  state = {
    category: [
      {
        id: "5d586cfe7db186777c5e66ca",
        name: "Uno"
      },
      {
        id: "5d586cfe7db186777c5e66ca",
        name: "Dos"
      },
      {
        id: "5d586cfe7db186777c5e66ca",
        name: "Tres"
      }
    ]
  };

  handleOnSelect = e => {
    console.log(e);
  };

  handleOnClick = e => {
    e.preventDefault();
    console.log("CLickMe");
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <form className="form-inline my-2 my-lg-0">
            <div className="col">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="Search....."
              />
            </div>
            <div className="col">
              <Combobox
                data={this.state.category}
                textField="name"
                valueField="id"
                onSelect={value => this.handleOnSelect(value)}
                placeholder="Category"
              />
            </div>
            <div className="col">
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={this.handleOnClick}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Filters;
