import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';



class Searchbar extends Component {

	constructor(props) {
		super(props);
		if (props.default) {
			this.state = { query: props.default }
		} else {
			this.state = { query: '' }
		}
	}


	handleChange = (event) => {
		const query = event.currentTarget.value;
		this.setState({ query });
		if (this.props.onChange) this.props.onChange(query);
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const query = this.state.query;
		if (this.props.clear) this.setState({ query: '' });
		this.props.history.push({
			pathname: '/search',
			search: '?q=' + query
		})
	}

	render() {
		return (
			<Form inline onSubmit={this.handleSubmit} className="searchbar mx-auto">

                <InputGroup>

				    <FormControl
				      className="searchbar__input"
				      placeholder="Rechercher..."
				      aria-label="Rechercher..."
				      aria-describedby="basic-addon2"
				      value={this.state.query}
				      onChange={this.handleChange}
				      type="text"
				    />
				    <InputGroup.Append className="searchbar__append mr-0">
				    	<Button variant="outline-secondary" className="searchbar__button" type="submit">
				    		<i className="fas fa-search"></i>
				    	</Button>
				    </InputGroup.Append>
				</InputGroup>

            </Form>
        )
	}
}

export default Searchbar;
