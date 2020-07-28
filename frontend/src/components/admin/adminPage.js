import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Tab, Tabs } from 'react-bootstrap';
import AdminTable from './adminTable';
import axios from 'axios';
const productFields = ['Nom', 'Prix', 'Description', /*'En stock', */ 'Catégorie', 'Favoris', 'Supprimer'];
const userFields = ['Prénom', 'Nom', 'Email', 'Admin', 'Téléphone', 'Supprimer'];
const orderFields = ['Date', 'Prix', 'Status', 'Produits', 'Client', 'Supprimer'];
const categoryFields = ['Title', 'Description', 'Supprimer'];

const CONFIG = require('../../config.json');

const API_URL = CONFIG.API_URL;


class AdminPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeTable: 'product',
            activeData: '',
            changedTab: false,
            refresh: false,
        };

        this.handleDelete = this.handleDelete.bind(this);
    }
    
    handleDelete(rowKey, tableName) {
        
        axios.delete(`${API_URL}${tableName}/${rowKey}`)
        .then((response) => {
            this.setState({refresh: true});
        })
        .catch((error) => {
            if (error.response) console.error(error.response);
            if (error.response && error.response.status === 401) {
            }
        });
	}

    componentDidUpdate() {
        if (this.state.refresh) {
            this.getData();
            this.setState({refresh: false});
        }
        if (this.state.changedTab) {
            this.getData();
            this.setState({changedTab: false});
        }

    }

    componentDidMount() {
        this.getData();
    }

    getData() {

        let url = `${API_URL}${this.state.activeTable}/`;
        if (this.state.activeTable === 'order') {
            url = url + 'all';
        }
        this.setState({activeData: ''});
        axios.get(url)
        .then((response) => {
            this.setState({activeData: response.data});
        })
        .catch((error) => {
            if (error.response) console.error(error.response);
            if (error.response && error.response.status === 401) {
            }
        });
	}

    selectTab(key) {
        this.setState({activeTable: key, changedTab: true})
    }

    render(){
        const admin = localStorage.getItem('ChiefVegetableOfficer');

        if (admin) {
        return(
            <Container>
                <Tabs onSelect={key => this.selectTab(key)}>
                    <Tab eventKey="product" title="Produits">
                        {this.state.activeTable === 'product' &&
                            <AdminTable activeTable={'product'} handleDelete={this.handleDelete} dataFields={productFields} data={this.state.activeData}/>
                        }
                    </Tab>
                    <Tab eventKey="user" title="Clients">
                        {this.state.activeTable === 'user' &&
                            <AdminTable activeTable={'user'} handleDelete={this.handleDelete} dataFields={userFields} data={this.state.activeData}/>
                        }
                    </Tab> 
                    <Tab eventKey="order" title="Commandes">
                        {this.state.activeTable === 'order' &&
                            <AdminTable activeTable={'order'} handleDelete={this.handleDelete} dataFields={orderFields} data={this.state.activeData}/>
                        }
                    </Tab> 
                    <Tab eventKey="category" title="Categories">
                        {this.state.activeTable === 'category' &&
                        <AdminTable activeTable={'category'} handleDelete={this.handleDelete} dataFields={categoryFields} data={this.state.activeData}/>
                        }

                    </Tab>
                </Tabs>
            </Container>

            )  
        } else {
            return <Redirect to="/" />
        }

    }
    
}
export default AdminPage;