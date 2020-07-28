import React, { Component } from 'react';
import AdminTableRow from './adminTableRow';
import { Table } from 'react-bootstrap';

class AdminTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRows: '',
			data: '',
			dataFields: '',
			activeTable: '',
            received: false,
            refresh: false
		}
    }

    generateHeaders(fields) {
        const headerFields = fields.map((field) =>
			<th>{field}</th>);
        this.setState({dataFields: headerFields});
	}
	
    generateDataRows(data) {
        const dataRows = data.map((dataItem) =>
            <AdminTableRow handleDelete={this.props.handleDelete} activeTable={this.state.activeTable} data={dataItem} key={dataItem._id} rowKey={dataItem._id} />);
        this.setState({dataRows: dataRows, received: true});
    }
	

    componentDidUpdate() {
		if (this.props.data && !this.state.received) {
            this.setState({data : this.props.data}, () => {
                this.generateDataRows(this.state.data);
            })
        }
        if (this.props.data.length !== this.state.data.length && this.state.received === true) {
            this.setState({data: this.props.data}, () => {
                if (this.state.data) {
                    this.generateDataRows(this.state.data)
                }
            })
        }
	}

    componentDidMount() {
		this.setState({
			activeTable: this.props.activeTable,
            dataFields: this.props.dataFields,
            refresh: this.props.refresh,
            data: this.props.data
		});
		this.generateHeaders(this.props.dataFields);

    }

filterStatus(selectedStatus) {
    this.setState({activeStatus: selectedStatus})
    let newDataSet = [];
    if (selectedStatus !== 'all') {
        this.state.alertsData.forEach(alert => {
            if (alert.status === selectedStatus) {
                newDataSet.push(alert);
            }
        });
    }
    else newDataSet = this.state.alertsData;
    this.generateAlerts(newDataSet);
}


    render() {
        return(
            <div className="container">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
							{this.state.dataFields}
                        </tr>
                    </thead>
                    <tbody>{this.state.dataRows}</tbody>
                </Table>
            </div>
        );
    }
}

export default AdminTable;