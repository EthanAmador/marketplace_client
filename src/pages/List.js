import React from "react";
import { Link } from "react-router-dom";
import Filters from "../components/Filters";
import Loading from "../components/Loading"; 
import Api from "../repository/Api";

class List extends React.Component {


  constructor(props){
    super(props); 
    this.state = {
      loading: true,
      error:false,
      data: undefined,
    };
  }

  componentDidMount(){
   this.fetchData();  
  }
  
  fetchData = async () =>{

    this.setState({loading:true, error:null}); 
    try {
      const data = await Api.product.getProducts(1,12); 
      this.setState({loading:false,data:data.data}); 
    } catch (error) {
      this.setState({loading:false,error:error}); 
    }
  }

  render() {
    if(this.state.loading === true){
      return <Loading />
    }
    return (
      <div>
        <Filters />
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {this.state.data.map(d => {
                return (
                  <div key={d._id} className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                      <img src="..." className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{d.name}</h5>
                        <p className="card-text">{d.description} </p>
                        <Link
                          to={`/detail/${d._id}`}
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
      </div>
    );
  }
}

export default List;
