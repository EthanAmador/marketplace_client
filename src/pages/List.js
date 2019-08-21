import React from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Api from "../repository/Api";
import { Combobox } from "react-widgets";

class List extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      data: undefined,
      loadMoreData:false,
      pageIndex: 1,
      pageSize: 12,
      dataCategories: undefined,
      filterValues: {
        category: '',
        search: ''
      }
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {

    this.setState({ loading: true, error: null });
    try {
      await this.getdataProducts();
      const _result = await Api.category.getCategory();
      this.setState({ loading: false, dataCategories: _result.data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  }

  handleChange = e => {
    this.setState({
      filterValues: {
        ... this.state.filterValues, [e.target.name]: e.target.value,
      },
    });
  };

  handleSelect = e => {
    this.setState({
      filterValues: {
        ... this.state.filterValues,
        category: e
      },
    });
  }

  handleOnSubmit = async e => {
    e.preventDefault();
    await this.getdataProducts();
  };

  getdataProducts = async () => {

    if(this.state.loadMoreData){
      let pageIndex = this.state.pageIndex +1
      this.setState({pageIndex:pageIndex, loadMoreData:false})

    }
    this.setState({ loading: true, error: null });
    try {
      const data = await Api.product.getProducts(this.state.pageIndex,
        this.state.pageSize,
        this.state.filterValues.search,
        this.state.filterValues.category._id);

        let result =undefined; 
        if(this.state.data)
        result = [].concat(this.state.data,data.data); 
        else
          result = data.data

      this.setState({ 
        loading: false, 
        data: result
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  }

  render() {
    if (this.state.loading === true) {
      return <Loading />
    }
    return (
      <div>
        <div className="album py-5 bg-light">
          <div className="row justify-content-md-center Form_Search">
            <form className="form-inline my-2 my-lg-0" onSubmit={this.handleOnSubmit}>
              <div className="col">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="search"
                  value={this.state.filterValues.search}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col">
                <Combobox
                  data={this.state.dataCategories}
                  textField="name"
                  valueField="_id"
                  placeholder="Category"
                  onChange={value => this.handleSelect(value)}
                  value={this.state.filterValues.category}
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

          <div className="container">
            <div className="row">
              {this.state.data.map(d => {
                return (
                  <div key={d._id} className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                      <img src={d.image} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{d.name}</h5>
                        <p className="card-text">{d.description} </p>
                        <Link
                          to={`/create/${d._id}`}
                          className="btn btn-primary"
                        >
                          view
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <button 
          type="button" 
          className="btn btn-lg btn-block btn-outline-primary"
          onClick={ async() =>{
            this.setState({loadMoreData:true}); 
            await this.getdataProducts();
          } }>
          Load more products</button>
      </div>
    );
  }
}

export default List;
