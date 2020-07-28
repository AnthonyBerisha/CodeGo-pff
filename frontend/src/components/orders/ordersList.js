import React, { Component } from 'react';
import Order from './order';

class CurrentOrders extends Component {
  constructor(props) { 
    super(props);
    console.log('Orders List', this.props.orders);
    this.state = {
      orders: '',
      received: false,
    }
  }


  componentDidUpdate() {
    if (!this.state.received) {
      console.log('Update', this.props.orders);
      const CurrentOrders = this.props.orders.map((order) =>
      <Order orderData={order} key={order._id} />)      
      this.setState({orders: CurrentOrders, received: true});
    }
  }
  
  
  render() {
    if (this.state.received) {
      console.log('List', this.state.orders);
    }

    return (
		<div className="container orders-list">
			<h3 className="list-title">{this.props.listTitle}</h3>
			<div>
        {this.state.orders}
			</div>
		</div>
    )
  }
}

export default CurrentOrders;