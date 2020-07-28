import React, { Component } from 'react';
import {Form, Button, Card} from 'react-bootstrap';
const axios = require('axios');
require('../../axios/axios');
const CONFIG = require('../../config.json');
const API_URL = CONFIG.API_URL;

export default class DeleteAccount extends Component {
    constructor(props) { 
        super(props);
        this.state = {
          email:'',
          password:''
        }
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        
        axios.post(`${API_URL}auth/login`, user)
        .then( (response) => {
            if(response.status === 200) {
                axios.delete(`${API_URL}auth`)
                .then( (response) => {
                    console.log(response);
                    this.props.history.push('/');
                })
                .catch((error) => {
                    if (error.response && error.response.status === 404) {
                        console.log(error.message);
                    }
                });
            }
        })
        .catch( (error) => {
            if (error.response && error.response.status === 401) {
                this.props.showAlert();
            }
        });
        
    }
    

    render() {
        return(
            <Card style={{ width: '30rem' }} border='danger' className="mx-auto mt-4">
            <Card.Header as="h4">Supprimer votre compte</Card.Header>
            <Card.Body>
                <Card.Title>Attention ! Cette opération est irréversible.</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Si vous souhaitez supprimer votre compte,merci de saisir vos identifiants.</Card.Subtitle>
                {/* <Card.Text> */}
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group md="4" lg="3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="email"
                            />
                        </Form.Group>

                        <Form.Group md="4" lg="3" controlId="formBasicPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder="Mot de passe"
                            maxLength="16"
                            />
                        </Form.Group>

                        <Button type="submit" variant="danger">Supprimer le compte</Button>
                    </Form>
                {/* </Card.Text> */}
                </Card.Body>
            </Card>
        )
    };
}