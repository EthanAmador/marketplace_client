import React from "react";
import { Combobox } from "react-widgets";
import Api from "../repository/Api";
import Loading from "../components/Loading";
import FileUpload from "../components/FileUpload";

class ProductsCreate extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: undefined,
      category: {
        data: undefined
      },
      product: {
        data: undefined
      },
      form:{
        name: "",
        description: "",
        price: "",
        cmbCategory: "",
        file: ""
      }
    };
  }

  componentDidMount() {
    this.fetchData();

    const {
      match: { params }
    } = this.props;
    if (params.id) {
      this.getProduct(params.id);
    } else {
    }
  }

  fetchData = async () => {
    this.setState({ error: undefined, loading: true });
    try {
      const _data = await Api.category.getCategory();
      this.setState({ category: { data: _data.data }, loading: false });
    } catch (error) {
      this.setState({ error: error, loading: false });
    }
  };

  getProduct = async id => {
    this.setState({ error: undefined, loading: true });
    try {
      let _data = await Api.product.getProductById(id);
      
      _data = _data.data[0]; 
      
      this.setState({
        form:{
          name: _data.name,
          description: _data.description,
          price: _data.price,
          cmbCategory:{
            _id: _data.categoryId,
            name:_data.categoryName
          },
          file:{
            base64: _data.image
          }
        },
        product:_data
      });
    } catch (error) {
      this.setState({ error: error, loading: false });
    }
  };

  handleOnChange = e => {
    
    this.setState({
      form:{
        ... this.state.form, 
        [e.target.name]: e.target.value
      }
    });
  };

  handleOnSelect = value => {
    this.setState({
      form:{
        ... this.state.form, 
        cmbCategory: value
      }
      
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    let _product = {
      name: this.state.form.name,
      description: this.state.form.description,
      price: this.state.form.price,
      //categoryId: this.state.form.cmbCategory._id,
      categoryName: this.state.form.cmbCategory.name,
      image: this.state.form.file.base64
    };
    let _id = this.state.product._id;
    this.saveProduct(_id,_product).then(() => {this.props.history.push('/')});
  };

  saveProduct = async (id,product) => {
    try {
      const _result = undefined
      if(id){
        _result = await Api.product.modifProduct(id,product); 
      }else{
        _result = await Api.product.saveProduct(product);
      }
      
    } catch (error) {
      console.log(error); 
    }
  };

  getFiles = file => {
    this.setState({ 
      form:{
        ... this.state.form, 
          file: file
      }
       });
  };

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
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <Combobox
              data={this.state.category.data}
              textField="name"
              valueField="_id"
              onSelect={value => this.handleOnSelect(value)}
              onChange={value => this.handleOnSelect(value)}
              placeholder="Category"
              name="cmbCategory"
              value={this.state.form.cmbCategory}
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <FileUpload
              onDone={this.getFiles.bind(this)}
              name="file"
              value={this.state.form.file}
              onChange={this.getFiles.bind(this)}
            />
          </div>
          <button className="btn btn-outline-success float-right">Save</button>
        </form>
      </div>
    );
  }
}

export default ProductsCreate;
