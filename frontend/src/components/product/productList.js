import React, { Component } from 'react';
import { Container, CardColumns } from 'react-bootstrap';
import axios from 'axios';
import Product from './product';
const CONFIG = require('../../config.json');
const API_URL = CONFIG.API_URL;

class ProductList extends Component {
  constructor(props) { 
    super(props);
    console.log(props);
    this.state = {
      products: []
      }
  }


  componentDidMount() {
    axios.get(`${API_URL}product/`)
      .then(response => {
         console.log(response);
        this.setState({ 
          products: response.data
         })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  
  
  render() {
    const productList = this.state.products.map((product) =>
      <Product product={product} key={product._id} />
    )
    

    return (
      <Container>
        <CardColumns>
          {productList}
        </CardColumns>
      </Container>
    )
  }
}

export default ProductList;