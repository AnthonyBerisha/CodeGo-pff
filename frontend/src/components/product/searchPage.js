import React, { Component } from 'react';
import { Container, CardColumns, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';
import Product from './product';
import Searchbar from '../layout/searchbar';
const CONFIG = require('../../config.json');
const API_URL = CONFIG.API_URL;


class SearchPage extends Component {

  constructor(props) {
    super(props);
    const url = new URL(window.location.href);
    this.state = {
        options: [],
        products: [],
        defaultCategories: [],
        loadingComplete: false,
        selectedCategories: url.searchParams.get("c") || [],
        query: url.searchParams.get("q") || ''
    }
    console.log(url.searchParams.get("c"));
    console.log(this.state)
  }

  updateUrl = (query, selectedCategories) => {
    let search = (query) ? '?q=' + query : '';
    if (selectedCategories.length > 0) {
      search += (query) ? '&' : '?';
      search = search + 'c=' + selectedCategories;
    }
    this.props.history.push({
      pathname: '/search',
      search: search
    })
  }

  onQueryChange = (query) => {
    if (query !== this.state.query) {
      this.setState({ query });
      this.updateUrl(query, this.state.selectedCategories);
      this.filterSearch(query, this.state.selectedCategories);
    }
  }

  onSelectChange = (data) => {
    const categories = [];
    if (data) data.map((element) => categories.push(element.value));
    this.setState({ selectedCategories: categories });
    this.filterSearch(this.state.query, categories);
    this.updateUrl(this.state.query, categories);
  }

  filterSearch = (query, selectedCategories) => {
    if (query && selectedCategories.length > 0) {
      this.browseProducts(
        `${API_URL}product/browse/advanced`,
        { query, categories: selectedCategories });
    } else if (query && selectedCategories.length === 0) {
      this.browseProducts(
        `${API_URL}product/browse`,
        { query })
    } else if (!query && selectedCategories > 0) {
      this.browseProducts(
        `${API_URL}product/category`,
        { categories: selectedCategories })
    }
  }

  browseProducts = (apiEndpoint, params) => {
    axios.get(apiEndpoint, { params })
    .then(response => {
        // console.log(response);
        this.setState({
          products: response.data
         })
      })
      .catch((error) => {
        console.error(error);
      })
  }

  componentDidMount() {
    axios.get(`${API_URL}category/`)
      .then(response => {
        const categories = [];
        response.data.map((data) => categories.push({
          label: data.title,
          value: data._id
        }))
        const defaultCategories = categories.filter(option =>
          this.state.selectedCategories.indexOf(option.value) !== -1
        );
        this.setState({
          options: categories,
          defaultCategories,
          loadingComplete: true
        });
        this.filterSearch(this.state.query, this.state.selectedCategories);
      })
      .catch((error) => {
        console.error(error);
      })
  }


  
  render() {

    const productList = this.state.products.map((product) =>
      <Product product={product} key={product._id} />
    )

    return (
      <Container>
        <div className="search__header mt-4">
          <h2>Recherche</h2>
          <Searchbar
            history={this.props.history}
            onChange={this.onQueryChange}
            default={this.state.query} />
            <br />
          {this.state.loadingComplete ?
              <Select
              isMulti
              isSearchable={false}
              placeholder="Catégories..."
              options={this.state.options}
              onChange={this.onSelectChange}
              defaultValue={this.state.defaultCategories} />
            : <Spinner animation="border" variant="success" />}
        </div>
          <CardColumns>
          {productList}
        </CardColumns>
      </Container>
    )
  }
}

export default SearchPage;