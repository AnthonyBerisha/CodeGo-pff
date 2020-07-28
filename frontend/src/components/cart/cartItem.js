import React, { Component } from 'react';
import {Table, Image, Button} from 'react-bootstrap';


class CartItem extends Component {

    render() {
        return (
            <tr>
                <td className="card-item__image-column">
                    <a href={`/product/${this.props.item._id}`} className="cart-item__image-container">
                        <Image src={this.props.item.image} className="img-fluid cart-item__image"/>
                    </a>
                </td>
                <td className="align-middle">
                    <a href={`/product/${this.props.item._id}`}>
                        {this.props.item.name}
                    </a>
                </td>
                <td className="align-middle">{this.props.item.price}&nbsp;&euro;</td>
                <td className="align-middle">{this.props.item.count}</td>
                <td className="align-middle">
                    <Button variant="danger" onClick={() => this.props.delete(this.props.deleteKey)} className="cart-item__button">
                        <i className="fas fa-times-circle cart-item__button-icon"></i>
                    </Button>
                </td>
            </tr>
        )
    }

}

export default CartItem;