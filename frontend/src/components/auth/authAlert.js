import React, { Component } from "react";
import Alert from 'react-bootstrap/Alert';


export default class AuthAlert extends Component {

	text = this.props.message.text;
	link = this.props.message.link;
	href = this.props.message.href;


	render() {
	    return (
	  	  <Alert variant="danger"
	  	   onClose={this.props.hideAlert}
	  	   dismissible>
	  	    {this.text}

	  	    {/* Display link */}
	  	    {this.link
	  	    	&& <Alert.Link href={this.href}>
	  	    		   {this.link}
	  	    	   </Alert.Link>
	  	    }
	  	  </Alert>
	    )
	}
}
