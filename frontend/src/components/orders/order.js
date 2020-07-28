import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Card, OverlayTrigger, Popover, Button, ListGroup} from 'react-bootstrap';

class Order extends Component {
  constructor(props) { 
    super(props);
    console.log('Order props', props);
    
  }

  render() {

    const products = this.props.orderData.products.map((product) =>
      <ListGroup.Item><a href={`/product/${product._id}`}>{product.name} - {product.price}&nbsp;&euro;</a></ListGroup.Item>
    )

    return (
      <div className="container order">
        <Card>
          <Card.Body>
            <Container>
              <Row>
                <Col md={true} sm={8}>
                  <Card.Text>Numéro de commande {this.props.orderData._id}</Card.Text>                
                </Col>
                <Col large={30} md={true} sm={4} xs={4} className="order-status">
                  <Card.Text>Status</Card.Text>
                  <Card.Text>{this.props.orderData.status}</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>
                    {new Date(this.props.orderData.date).toLocaleDateString()}
                  </Card.Text>
                </Col>
                <Col md={5} >
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency:  "EUR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(this.props.orderData.price)}
                    </Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                      <OverlayTrigger
                        trigger="click"
                        key={"bottom"}
                        placement={"bottom"}
                        overlay={
                          <Popover id={"popover-positioned-bottom"}>
                        {/* <Popover.Title as="h3">Commande {this.props.orderData._id}</Popover.Title> */}
                            <Popover.Content>
                              <ListGroup>
                                {products}
                              </ListGroup>
                            </Popover.Content>
                          </Popover>
                        }
                      >

                        <Button variant="secondary">Products</Button>
                      </OverlayTrigger>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>


    )
  }
}

export default Order;