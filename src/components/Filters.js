import React from "react";
import { Combobox } from "react-widgets";

class Filters extends React.Component {

  handleOnClick = e => {
    e.preventDefault();
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
                name="search"
                value={this.props.formValues.search}
                onChange={this.props.onChange}
              />
            </div>
            <div className="col">
              <Combobox
                data={this.props.dataCategory}
                textField="name"
                valueField="_id"
                placeholder="Category"
                onChange={this.props.onChange}
                value={this.props.formValues.category}
                name="category"
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
