import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Footer extends Component {
    render() {
        return (
            <footer>
                <img className="footer-background img-fluid" src='http://localhost:3000/footerback.png' alt=''></img>
                <Row className="footer">
                    <Col sm={12} md={4}>©Copyright Jardin Cabellio 2020</Col>
                    <Col sm={12} md={4}>220 rue des petits melons, 84300 Cavaillon</Col>
                    <Col sm={12} md={4}>contact@jardinCabellio.com, 01.40.15.20.88</Col>
                </Row>
            </footer>
        )
    }
}

export default Footer;