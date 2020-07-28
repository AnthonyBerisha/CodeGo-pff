import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import axios from 'axios';
const CONFIG = require('../../config.json');
const API_URL = CONFIG.API_URL;

class ProductDetails extends Component {
  constructor(props) { 
    super(props);
    console.log(props);
    this.state = {
      name:'',
      description:'',
      price:'',
      image:'',
      category:''
    }

  }


  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`${API_URL}product/` + id)
      .then(response => {
        // console.log(response);
        this.setState({ 
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          image: response.data.image,
          category: response.data.category.title
         })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  addToCart = (e) => {
    e.preventDefault();
    const string = localStorage.getItem("addedId");
    if(string) {
      const newString = string +','+ this.props.match.params.id;
      localStorage.setItem("addedId", newString);
    } else {
      localStorage.setItem("addedId", this.props.match.params.id);
    }
  }


  render() {
    const title = this.state.name;
    const image = this.state.image;
    const description = this.state.description;
    const price = this.state.price;
    const category = this.state.category;

    return (
      <div>
        <Container >
          <Card style={{ width: '50%' }}>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Subtitle>{category}</Card.Subtitle> 
              <Card.Img variant="top" src={image} width="100"/>
              <Card.Text>{description}</Card.Text>
              <Card.Text>prix: {price} euros</Card.Text>
              <Button onClick={this.addToCart} style={{margin: "5%"}} variant="primary" >
              <i className="fas fa-shopping-basket"></i>
            </Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  }
}

export default ProductDetails;