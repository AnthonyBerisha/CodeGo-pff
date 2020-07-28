import React, { Component } from 'react';
import AdminTableCell from "./adminTableCell";
class AdminTableRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTable: '',
			productList: '',
		}
	}

	componentDidUpdate() {
		if(this.state.activeTable === 'order' && !this.state.productList && this.props.data.products) {
			this.generateProductList(this.props.data);
		}
	}

	componentDidMount() {
		this.setState({activeTable: this.props.activeTable});
	}

	generateProductList(data) {
		const products = data.products.map((product) =>
			<p>{product.name}</p>);
		this.setState({productList: products});
	}

    render(){
        return(
			<>
			{this.state.activeTable === 'product' &&
			<tr>
				<AdminTableCell tableName={this.state.activeTable} rowKey={this.props.rowKey} type={"text"} field="name" data={this.props.data.name}/>
				<AdminTableCell tableName={this.state.activeTable} rowKey={this.props.rowKey} type={"text"} field="price" data={`${this.props.data.price}`}/>
				<AdminTableCell tableName={this.state.activeTable} rowKey={this.props.rowKey} type={"text"} field="description" data={this.props.data.description}/>
				{/* <AdminTableCell tableName={this.state.activeTable} rowKey={this.props.rowKey} type={"boolean"} field="inStock" data={this.props.data.inStock}/> */}
				<AdminTableCell tableName={this.state.activeTable} rowKey={this.props.rowKey} type={"category"} field="category" data={this.props.data.category}/>
				<AdminTableCell tableName={this.state.activeTable} rowKey={this.props.rowKey} type={"boolean"} field="favorite" data={this.props.data.favorite}/>
				<AdminTableCell tableName={this.state.activeTable} rowKey={this.props.rowKey} type={"button"} field="supprimer" handleDelete={this.props.handleDelete} data='delete'/>
            </tr>
			}
			{this.state.activeTable === 'user' &&
			<tr>
				<td>{this.props.data.firstName}</td>
				<td>{this.props.data.lastName}</td>
				<td>{this.props.data.email}</td>
				<AdminTableCell tableName={this.state.activeTable} rowKey={this.props.rowKey} type={"boolean"} field="admin" data={this.props.data.admin}/>
				<td>{this.props.data.phone}</td>
				<AdminTableCell tableName={this.state.activeTable} rowKey={this.props.rowKey} type={"button"} field="supprimer" handleDelete={this.props.handleDelete} data='delete'/>
            </tr>
			}
			{this.state.activeTable === 'order' &&
			<tr>
				<td>{new Date(this.props.data.date).toLocaleDateString()}</td>
				<td>{this.props.data.price}</td>
				<AdminTableCell tableName={this.state.activeTable} rowKey={this.props.rowKey} type={"text"} field="status" data={this.props.data.status}/>
				<td>{this.state.productList}</td>
				<td>{this.props.data.userId.email}</td>
				<AdminTableCell tableName={this.state.activeTable} rowKey={this.props.rowKey} type={"button"} field="supprimer" handleDelete={this.props.handleDelete} data='delete'/>
            </tr>
			}
			{this.state.activeTable === 'category' &&
			<tr onClick= {this.test}>
				<td>{this.props.data.title}</td>
				<td>{this.props.data.description}</td>
				<AdminTableCell tableName={this.state.activeTable} rowKey={this.props.rowKey} type={"button"} field="supprimer" handleDelete={this.props.handleDelete} data='delete'/>

			</tr>
			}
			</>
        );
    }
}

export default AdminTableRow;