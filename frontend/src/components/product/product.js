import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


class Product extends Component {
  constructor(props) { 
    super(props);
    console.log(props);      
  }

  addToCart = (e) => {
    e.preventDefault();
    const string = localStorage.getItem("addedId");
    if(string) {
      const newString = string +','+ this.props.product._id;
      localStorage.setItem("addedId", newString);
    } else {
      localStorage.setItem("addedId", this.props.product._id);
    }
  }


  render() { 
  return (
    <Card className="product-card">
      <a href={`/product/${this.props.product._id}`} className="product-card__image-container">
        <Card.Img variant="top" src={this.props.product.image} className="img-fluid product-card__image" />
      </a>
        <Card.Body className="product-card__text">
          <Card.Title>{this.props.product.name}</Card.Title>
          <span>{this.props.product.price}&nbsp;&euro;</span>
          <Button onClick={this.addToCart} variant="primary" className="cart-button float-right">
            <i className="fas fa-shopping-basket"></i>
          </Button>
      </Card.Body>
    </Card>
    )
  }
}
export default Product;