import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';

class OrderSuccess extends Component {


    render() {
        return(
            <Container>
                <Card border="success" style={{ width: '30rem' }} className="mx-auto mt-4">
                    <Card.Header>Votre commande a été enregistrée!</Card.Header>
                    <Card.Body>
                    <Card.Title>Merci pour votre visite!</Card.Title>
                    <Card.Text>
                        Vous pouvez suivre vos commandes en cours depuis <a href="/order">votre espace client</a>.
                    </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default OrderSuccess;