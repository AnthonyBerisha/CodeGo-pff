import React, { Component } from 'react';
import { Container, CardColumns } from 'react-bootstrap';
import axios from 'axios';
import Product from './product';
const CONFIG = require('../../config.json');
const API_URL = CONFIG.API_URL;

class ProductCategory extends Component {

  state = {
    category: {},
    products: []
  }

  componentDidMount() {
    const title = this.props.match.params.title;
    axios.get(`${API_URL}category/` + title)
      .then(response => {
          console.log(response);
          this.setState({ category: response.data })
          axios.get(`${API_URL}product/category`, {
            params: { categories: [response.data._id] }
          })
            .then(response => {
               console.log(response);
               this.setState({ products: response.data })
            })
            .catch((error) => {
              console.error(error.response);
            })
      })
      .catch((error) => {
        console.error(error);
      })
  }

  
  
  render() {
    const category = this.state.category;
    const productCategory = this.state.products.map((product) =>
      <Product product={product} key={product._id} />
    )
    

    return (
      <Container>
        <h1
          className="category__heading"
          data-title={category.title}
          >
          {category.title}
        </h1>
        <p>{category.description}</p>
        <CardColumns>
          {productCategory}
        </CardColumns>
      </Container>
    )
  }
}

export default ProductCategory;