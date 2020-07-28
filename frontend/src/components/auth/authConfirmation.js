import React, { Component } from "react";
import Alert from 'react-bootstrap/Alert';


export default class AuthConfirmation extends Component {

	text = this.props.message.text;


	render() {
		// console.log(this.props);
	    return (
	  	  <Alert variant="success"
	  	   onClose={this.props.hideConfirmation}
	  	   dismissible>
	  	    {this.text}

	  	  </Alert>
	    )
	}
}