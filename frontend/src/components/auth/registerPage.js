import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import RegisterForm from './registerForm';
import AuthAlert from './authAlert';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';



export default class RegisterPage extends Component {

	state = {
	  duplicateError: false
	}

	hideAlert = () => {
	  this.setState({ duplicateError: false })
	}

	showAlert = () => {
	  this.setState({ duplicateError: true })
	}

	message = {
		text: 'Un compte existe déjà pour cet email. ',
		link: 'Connectez-vous !',
		href: '/login'
	};


	render() {
	  const token = localStorage.getItem('accessToken');

	  if (token) {
	  	return < Redirect to="/" />
	  } else {
	      return (
		  	<Container className="form">

		  	  { this.state.duplicateError &&
		  	  	<AuthAlert hideAlert={this.hideAlert} message={this.message} /> }

		  	  <h2 className="form__heading">Créez votre compte</h2>
			  <RegisterForm showAlert={this.showAlert} history={this.props.history} />

			  <Alert variant='warning'>
			  	Vous avez déjà un compte ?&nbsp;
			  	<Alert.Link href='/register'>
			  		Connectez-vous !
			  	</Alert.Link>
			  </Alert>

			</Container>
	      )
	  }
	}
}