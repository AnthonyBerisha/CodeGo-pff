import React, { Component } from 'react';
import OrdersList from './ordersList';
import { Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
require('../../axios/axios');
const CONFIG = require('../../config.json');
const API_URL = CONFIG.API_URL;

class OrderPage extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      currentUserId: '',
    }
    // console.log(props);
    this.filterOrders.bind(this);
  }

  filterOrders(orders) {
    let CurrentOrders = [];
    let PastOrders = [];
    orders.forEach(order => {
      if (order.status === "Terminée") {
        PastOrders.push(order);
      }
      else {
        CurrentOrders.push(order);
      }
    });
    this.setState({
      CurrentOrders: CurrentOrders,
      PastOrders: PastOrders 
    })
  }

  componentDidMount() {
    // Axios request here
    // Get current user's orders, separate them between passed and current and store them in props
    // Pass them to the OrdersList components in render
    // let id = localStorage.getItem(userId);
    // let id = '5e319dbba4a44e36a150492c';
    // let id = '5e319dbba4a44e36a152452c';
    // this.setState({currentUserId: id});
    axios.get(`${API_URL}order/`)
      .then(response => {
        console.log('Orders from db ', response);
        this.filterOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="container">
        <Container>
          <Row>
            <Col>
              <OrdersList orders={this.state.CurrentOrders} listTitle={"Commandes actuelles"}/>
            </Col>
            <Col>
              <OrdersList orders={this.state.PastOrders} listTitle={"Commandes terminées"}/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default OrderPage;