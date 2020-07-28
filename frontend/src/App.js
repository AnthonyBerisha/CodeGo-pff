import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './styles.css';

import Home from './components/home/home';
import RegisterPage from './components/auth/registerPage';
import LoginPage from './components/auth/loginPage';
import Logout from './components/auth/logout';
import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import SearchPage from './components/product/searchPage';
import ProductList from './components/product/productList';
import ProductDetails from './components/product/productDetails';
import ProductCategory from './components/product/productCategory';
import OrderPage from './components/orders/orderPage';
import About from '../src/components/about/about';

import SettingPage from './components/auth/settingPage';
import AdminPage from '../src/components/admin/adminPage';
import Cart from '../src/components/cart/cart';
import OrderSuccess from './components/cart/orderSuccess';


class App extends Component {
  render() {

    return (
    <Router>
        <Header />
        <main className="main">
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/logout/" exact component={Logout} />
            <Route path="/presentation" exact component={About} />
            {/* <Route path="/user" exact component={TODO} /> */}
            <Route path="/order" exact component={OrderPage} />
            <Route path="/orderSuccess" exact component={OrderSuccess} />
            <Route path="/product/:id" exact component={ProductDetails} />
            <Route path="/product/" exact component={ProductList} />
            <Route path="/setting/" exact component={SettingPage} />
            <Route path="/admin/" exact component={AdminPage} />
            <Route path="/cart/" exact component={Cart} />
            <Route path="/category/:title" exact component={ProductCategory} />
            <Route path="/search/" exact component={SearchPage} />
        </main>
        <Footer />
    </Router>
    )
  }
}

export default App;
