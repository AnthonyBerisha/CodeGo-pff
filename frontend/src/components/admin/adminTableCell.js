import React, { Component } from 'react';
import { Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';

const CONFIG = require('../../config.json');
const API_URL = CONFIG.API_URL;

export default class adminTableCell extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			readOnly: true,
			isCheckBox: false,
			currentValue: '',
			newValue: '',
			categoriesData: '',
			categories: '',
			dropdownTitle: ''
		}

	}

	componentDidMount() {
		this.setState({currentValue: this.props.data})
		if (typeof this.props.data === "boolean")
			this.setState({isCheckBox: true});
	}

	setReadOnly() {
		this.setState({readOnly: false})
	}

	patchData(id, field, payload) {
		const patchData = {};
		patchData[field] = payload;
		
		axios.patch(`${API_URL}${this.props.tableName}/${id}`, patchData)
		.then((response) => {
			
		})
		.catch((error) => {
            if (error.response) console.error(error.response);
            if (error.response && error.response.status === 401) {
            }
        });
		
	}

	handleOnBlur(e) {
		const patch = e.target.value;
		this.patchData(this.props.rowKey, this.props.field, patch);
		this.setState({readOnly: true});
	}

	handleChange(e) {
		this.setState({currentValue: e.target.value})
	}

	generateCategories() {
		const categories = this.state.categoriesData.map((category) =>
		<Dropdown.Item eventKey={category._id} onSelect={(eventKey, event) => this.handleSelect(this.props.rowKey, "category", eventKey, event)} value={category.title} as="button">{category.title}</Dropdown.Item>
		);
		if (!this.state.categories) {
			this.setState({categories: categories});
		}
	}
	
	getCategories() {
		axios.get(`${API_URL}category/`)
		.then((response) => {
			if (!this.state.categoriesData) {
				this.setState({categoriesData: response.data});
				this.generateCategories(this.state.categoriesData)
			}
		})
		.catch((error) => {
			if (error.response) console.error(error.response);
            if (error.response && error.response.status === 401) {
            }
        });
	}

	handleSelect(id, field, eventKey, event) {
		this.patchData(id, field, eventKey);
		this.setState({dropdownTitle: event.target.value})
	}

	handleCheckBox(event) {
		this.patchData(this.props.rowKey, this.props.field, event.target.checked);
	}

	render() {
		let cellType = '';
		switch (this.props.type) {
			case "text":
				cellType = <Form.Control onChange={(e) => this.handleChange(e)} onBlur={(e) => this.handleOnBlur(e)} readOnly={this.state.readOnly} defaultValue={this.props.data}/>;
				break;
			case "boolean":
				cellType = <Form.Check onChange={(e) => this.handleCheckBox(e)} defaultChecked={this.props.data}/>; 
				break;
			case "button":
				cellType = <Button variant="secondary" size="sm" onClick={() => this.handleDelete(this.props.rowKey, this.props.tableName)}>Supprimer</Button>
				break;
			case "category":
				if (!this.state.dropdownTitle) {
					this.setState({dropdownTitle: this.props.data.title});
				}
				this.getCategories();
				cellType = 
				<DropdownButton title={this.state.dropdownTitle}>
					{this.state.categories}
				</DropdownButton>
				break;
			default:
				break;
		}
		return (
			<td onClick={() => this.setState({readOnly: false})}>
				{cellType}
			</td>
		)
	}
}
