import React from "react";
import Api from "../repository/Api";
import Loading from "../components/Loading";



class Market extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                _id:"",
                name: "",
                description: "",
                price: "",
                categoryId:"",
                categoryName:"",
                image: "",
                quantity: ""
            },
            loading: false,
            error: undefined,
        }
    }

    componentDidMount(){
        const {
            match: { params }
          } = this.props;

          this.getProduct(params.id);
    }

    
  getProduct = async id => {
    this.setState({ error: undefined, loading: true });
    try {
      let _data = await Api.product.getProductById(id);
      _data = _data.data[0]; 
      this.setState({ loading: false,  
                    form:{
                        _id:_data._id,
                        name: _data.name,
                        description: _data.description,
                        price: _data.price,
                        categoryId:_data.categoryId,
                        categoryName:_data.categoryName,
                        image: _data.image,
                        quantity:""
                    }});
    } catch (error) {
      this.setState({ error: error, loading: false });
    }
  };

    handleOnChange = e => {

        this.setState({
            form: {
                ... this.state.form,
                [e.target.name]: e.target.value
            }
        });
    };

    handleOnSubmit = e => {
        e.preventDefault();

        let _shopping ={
            productId: this.state.form._id,
	        productName: this.state.form.name,
	        productDescription: this.state.form.description,
	        productPrice: this.state.form.price,
	        categoryId: this.state.form.categoryId,
            categoryName: this.state.form.categoryName,
            productImage: this.state.form.image,
	        quantity: this.state.form.quantity
        }
        this.saveShopping(_shopping).then(() =>{this.props.history.push('/')});   
        
    };


    saveShopping = async(shopping)=>{
        this.setState({ error: undefined, loading: true });
        try {
            await Api.shoppingCart.saveShopping(shopping); 
        } catch (error) {
            this.setState({ error: error, loading: false });
        }
    }

    render() {
        if (this.state.loading === true) {
            return (
              <div className="container Form_Create">
                <Loading />
              </div>
            );
          }
        return (
            <div className="container Form_Create">
                <form onSubmit={this.handleOnSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            aria-describedby="emailHelp"
                            placeholder="Name"
                            required
                            onChange={this.handleOnChange}
                            value={this.state.form.name}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            rows="3"
                            onChange={this.handleOnChange}
                            value={this.state.form.description}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            aria-describedby="emailHelp"
                            placeholder="Price"
                            required
                            onChange={this.handleOnChange}
                            value={this.state.form.price}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            className="form-control"
                            name="category"
                            aria-describedby="emailHelp"
                            placeholder="Category"
                            required
                            onChange={this.handleOnChange}
                            value={this.state.form.category}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                    <img  className="card-img-top" src={this.state.form.image} />
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input
                            type="number"
                            className="form-control"
                            name="quantity"
                            aria-describedby="emailHelp"
                            placeholder="Quantity"
                            required
                            onChange={this.handleOnChange}
                            value={this.state.form.quantity}
                            required
                        />
                    </div>
                    <button className="btn btn-outline-success float-right">Save</button>
                </form>
            </div>
        )
    }
}

export default Market; 