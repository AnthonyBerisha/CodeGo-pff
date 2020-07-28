import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import Searchbar from './searchbar';
import NavCategory from './navCategory';
import axios from 'axios';
require('../../axios/axios');
const CONFIG = require('../../config.json');
const API_URL = CONFIG.API_URL;


class Header extends Component {

    state = {
        categories : []
    }

    componentDidMount() {
        axios.get(`${API_URL}category`)
             .then(response => {
                this.setState({ categories: response.data });
               })
             .catch(error => console.error(error))
    }

    render() {
        const admin = localStorage.getItem('ChiefVegetableOfficer');
        const token = localStorage.getItem('accessToken');

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/" className="brand">

                    {/* Logo */}
                    <img
                        alt="Logo de Jardin Cabellio"
                        src={ 'http://localhost:3000/logo_navbar.png' }
                        className="d-inline-block align-top brand__logo"
                    />

                    {/* Brand title */}
                    <span className="brand__title ml-4">
                        Jardin Cabellio
                    </span>

                </Navbar.Brand>



                <Navbar.Toggle aria-controls="basic-navbar-nav" />



                <Navbar.Collapse id="basic-navbar-nav">

                    {/* Searchbar component */}
                    <Searchbar history={this.props.history} clear={true} />



                    {/* Navigation links */}
                    {(admin) ?
                      <Nav.Link href="/admin">
                        Admin
                      </Nav.Link> : <span></span> }

                    <Nav.Link href="/presentation">
                        A propos
                    </Nav.Link>

                    <DropdownButton
                      as={InputGroup.Prepend}
                      variant="outline-secondary"
                      title="Catégories"
                      className="searchbar__dropdown"
                      id="input-group-dropdown-1"
                    >
                        {this.state.categories.map(category => (
                            <NavCategory category={category} key={category._id} />
                            ))}
                    </DropdownButton>

                    {(token) ?
                    <DropdownButton
                      as={InputGroup.Prepend}
                      variant="outline-secondary"
                      title="Mon compte"
                      className="searchbar__dropdown"
                      id="input-group-dropdown-1"
                    >
                        <Dropdown.Item href="/order">Mes commandes</Dropdown.Item>
                        <Dropdown.Item href="setting">Paramètres</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="/logout" className="logout">Déconnexion</Dropdown.Item>
                    </DropdownButton>
                    : <Nav.Link href="/login">
                        Connexion
                    </Nav.Link> }

                    <Nav.Link href="/cart">
                        <i className="fas fa-shopping-basket nav-link__basket"></i>
                    </Nav.Link>

                </Navbar.Collapse>

            </Navbar>
        );
    }
}

export default withRouter(Header);