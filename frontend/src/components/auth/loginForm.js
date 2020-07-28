import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { Formik } from 'formik';
const axios = require('axios');
const CONFIG = require('../../config.json');
const API_URL = CONFIG.API_URL;


// Validation schema && error messages
const schema = yup.object({
  email: yup.string()
            .required('Veuillez entrer votre adresse email.')
            .email('Oups ! Ce n\'est pas un email valide.'),
  password: yup.string()
               .required('Veuillez entrer votre mot de passe.')
               .min(6, 'Le mot de passe doit contenir au moins 6 caractères.')
               .max(16, 'Le mot de passe ne peut pas contenir plus de 16 caractères.')
});

// Alert to display if email & password do not match


// Send data to backend
const sendToServer = (data, props) => {
	axios.post(`${API_URL}auth/login`, data)
	  .then(function (response) {
	    // console.log(response);
	    const details = response.data;
	    localStorage.setItem('refreshToken', details.tokens.refreshToken);
	    localStorage.setItem('accessToken', details.tokens.accessToken);
	    if (details.admin && details.admin === true) localStorage.setItem('ChiefVegetableOfficer', details.admin);
	    const referrer = props.history.location.state.from;
	    // console.log('state', props.history.location.state.from);
	    if (referrer) {
	    	props.history.push(referrer);
	    } else {
	    	props.history.push('/');
	    }
	  })
	  .catch(function (error) {
	  	console.error(error.message);
	  	if (error.response && error.response.status === 401) {
			// console.error(error.response);
	  		props.showAlert();
	  	}
	  });
	}


// Display && submission of the form
export default function LoginForm(props) {

	const token = localStorage.getItem('accessToken');
	
	if (token) {
		return <Redirect to="/" />
	} else {
	  return (
	    <Formik
	      validationSchema={schema}
	      onSubmit={(data) => sendToServer(data, props)}
	      initialValues={{
	        email: '',
			password: ''
	      }}
	    >
	      {({
	        handleSubmit,
	        handleChange,
	        handleBlur,
	        values,
	        touched,
	        isValid,
	        errors
	      }) => (
	        <Form noValidate onSubmit={handleSubmit}>

				<Form.Group md="4" lg="3">
					<Form.Label>Email</Form.Label>
					<Form.Control
					 type="email"
					 name="email"
		             onChange={handleChange}
		             onBlur={handleBlur}
		             value={values.email}
		             isValid={touched.email && !errors.email}
			         isInvalid={touched.email && !!errors.email}
					 placeholder="charles.ingalls@prairie.net"
					/>
					<Form.Control.Feedback type="invalid">
						{ errors.email }
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group md="4" lg="3">
					<Form.Label>Mot de passe</Form.Label>
					<Form.Control
					 type="password"
					 name="password"
		             onChange={handleChange}
		             onBlur={handleBlur}
		             isValid={touched.password && !errors.password}
			         isInvalid={touched.password && !!errors.password}
		             value={values.password}
					 placeholder="Mot de passe"
					 maxLength="16"
					/>
					<Form.Control.Feedback type="invalid">
						{ errors.password }
					</Form.Control.Feedback>
				</Form.Group>

				<div className="text-center">
					<Button type="submit" className="auth-button">Connexion</Button>
				</div>

			</Form>
		    )}
	    </Formik>
	  );
	}
}
