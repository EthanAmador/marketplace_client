import React from "react"; 
import { Combobox } from "react-widgets";
import Api from "../repository/Api"; 
import Loading from "../components/Loading"; 

class ProductsCreate extends React.Component{
    state={}; 
    constructor(props){
        super(props); 
        this.state = {
            category: {
                data:undefined,
                loading:false,
                error:undefined
            },
            name:'',
            description:'',
            price:'',
            categorySelect:{}
          };
    }

    componentDidMount(){
        this.fetchData();  
    }

    fetchData = async () =>{
        this.setState({ category:{error:undefined, loading:true}}); 
        try {
            const _data = await Api.category.getCategory();
            this.setState({ category:{data:_data.data, loading:false}}); 
        } catch (error) {
            this.setState({ category:{error:error, loading:false}}); 
        }
    }   

    handleOnChange = (e) =>{
        this.setState({ 
            [e.target.name]: e.target.value
        } )
    }

    handleOnSelect=(value)=>{
        this.setState({
            "categorySelect": value
        })
    }

    handleOnSubmit=(e)=>{
        e.preventDefault(); 

        let _product = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            categoryId:this.state.categorySelect._id,
            categoryName:this.state.categorySelect.name
        }
       
        this.saveProduct(_product); 
    }

    saveProduct = async (product) =>{
        try {
          const _result = await Api.product.saveProduct(product)
          this.constructor(null); 
        } catch (error) {

        }
    }


    render(){
        
        if(this.state.category.loading === true){
            return(
                <div className="container Form_Create">
                    <Loading />
                </div>
            ) 
        }
        return(
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
                                value={this.state.name}/>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea 
                                className="form-control" 
                                name="description" 
                                rows="3"
                                onChange={this.handleOnChange}
                                value={this.state.description}
                                >
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label >Price</label>
                        <input 
                                type="number" className="form-control" 
                                name="price" 
                                aria-describedby="emailHelp" 
                                placeholder="Price"
                                required
                                onChange={this.handleOnChange}
                                value={this.state.price}
                                />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <Combobox
                            data={this.state.category.data}
                            textField="name"
                            valueField="_id"
                            onSelect={value => this.handleOnSelect(value)}
                            placeholder="Category"/>
                    </div>
                    <button className="btn btn-outline-success float-right">Success</button>
                </form>
            </div>
        ); 
    }
}

export default ProductsCreate; 