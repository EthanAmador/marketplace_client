import React from "react"; 

class ProductDetail extends React.Component{

    componentDidMount(){
        const { match: { params } } = this.props;    
    }

    render(){
        return(
            <h1>Detalle producto {}</h1>
        ); 
    }
}

export default ProductDetail; 