import React, { Component } from "react";
import LoginForm from './loginForm';
import AuthAlert from './authAlert';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';


export default class LoginPage extends Component {

	state = {
	  matchError: false
	}

	hideAlert = () => {
	  this.setState({ matchError: false })
	}

	showAlert = () => {
	  this.setState({ matchError: true })
	}

	message = {
		text: "L'email et le mot de passe ne concordent pas."
	}


	render() {
	  return (
	  	<Container className="form">

	  	  { this.state.matchError &&
	  	  	<AuthAlert hideAlert={this.hideAlert} message={this.message} /> }

	  	  <h2 className="form__heading">Connectez-vous</h2>
		  <LoginForm showAlert={this.showAlert} history={this.props.history} />

		  <Alert variant='warning'>
		  	Vous n'avez pas de compte ?&nbsp;
		  	<Alert.Link href='/register'>
		  		Inscrivez-vous !
		  	</Alert.Link>
		  </Alert>


		</Container>
	  )
	}
}