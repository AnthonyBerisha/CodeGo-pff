import React, { Component } from 'react';
import { Container, Card, Button, Table, Row, Col } from 'react-bootstrap';
import CartItem from './cartItem';
const axios = require('axios');
const CONFIG = require('../../config.json');
const API_URL = CONFIG.API_URL;

class Cart extends Component {
    constructor(props) { 
        super(props);
        // console.log(props);
        this.state = {
          items: [],
          itemsCount: [],
          sum: 0
        }
    }

    //returns an array of objects containing id and count of each product
    itemCounter() {
        let original =[];
        if(localStorage.addedId.search(',') === -1) {
            original = [localStorage.addedId];
            
        } else {
            original = localStorage.addedId.split(',');
        }
        var counter = [];
        // make a copy of the original array
        let copy = original.slice(0);
     
        // first loop goes over every element
        for (let i = 0; i < original.length; i++) {
     
            let myCount = 0;	
            // loop over every element in the copy and see if it's the same
            for (let w = 0; w < copy.length; w++) {
                if (original[i] === copy[w]) {
                    // increase amount of times duplicate is found
                    myCount++;
                    // sets item to undefined
                    copy[w] = '';
                }
            }
     
            if (myCount > 0) {
                let a = {};
                a._id = original[i];
                a.count = myCount;
                counter.push(a);
            }
        }
        return counter;
    };
    
    componentDidMount() {
        this.getData();
    }

    componentDidUpdate() {
        this.getData();
    }
    
    getData() {

        if(localStorage.getItem("addedId") !== '') {
           
            axios.get(`${API_URL}product/cart/` + localStorage.getItem("addedId"))
            .then(response => {
                // console.log(response);
                const products = response.data;
                const counter = this.itemCounter();
                let items = [];
  
              for(let i = 0; i < products.length ; i++) {
  
                  for(let j = 0; j < counter.length ; j++) {
  
                      if (products[i]._id === counter[j]._id) {
                          items[i] = {...products[i], ...counter[j]};
                      }
                  }
              }
            //   console.log(counter);

              //calculate the total price of cart
              let sum = 0;
              for(let i = 0; i < items.length ; i ++) {
                sum += (items[i].price * items[i].count); 
              }
            //   console.log(items);
              this.setState ({
                  items: items,
                  itemsCount: counter,
                  sum: sum
              }) 
                        
            })
            .catch((error) => {
              console.error(error);
            })
        } else {
            console.log('Le panier est vide');
        }
    }

    deleteItem = (idToDelete) => {
        console.log('a supprimer: '+ idToDelete);
    
        let originIds = localStorage.getItem("addedId").split(',');
        console.log('avant supprimer: ' + originIds);
        let newIds = [];

        originIds.forEach(id => {
            if(id !== idToDelete) {
                newIds.push(id);
            }
        })
          newIds = newIds.join(',');
    
        console.log('après supprimer: ' + newIds);

        localStorage.setItem("addedId", newIds);
        this.getData();
    }

    createOrder = () => {
        const token = localStorage.getItem("accessToken");
        if (token === null) {
            this.props.history.push({
                pathname: "/login",
                state: { from: '/cart' }
            });
        }

        axios.post(`${API_URL}order/`, {
            products: this.state.items,
            itemsCount: this.state.itemsCount,
            price: this.state.sum
        })
        .then((response) => {
            console.log(response);
            this.props.history.push("/orderSuccess");
            localStorage.setItem('addedId','');
        })
        .catch((error) => {
            console.log(error.message);
              console.error(error.response);
              if (error.response) console.error(error.response);
          
        });
    }

    render() {
        const cartItem = this.state.items.map((item) => 
            <CartItem item={item} deleteKey={item._id} delete={this.deleteItem}/>
        )
        return (
            <Container>
                <Card className="cart">
                <Card.Body>
                    <Row>
                        <Col className="flex justify-content-center">
                            <Card.Title>Mon panier</Card.Title>
                            <Card.Text>
                                Total: {this.state.sum} €
                            </Card.Text>
                        </Col>
                        <Col className="flex justify-content-center">
                            <Button variant="success" onClick={this.createOrder} className="cart__button float-right align-middle">
                                Valider la commande
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
                </Card>
                <Table responsive className="cart__table">
                    <tbody>
                        {cartItem}
                    </tbody>
                </Table>
            </Container>
        )
    }

}

export default Cart;