import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup';
import { Formik } from 'formik';
const axios = require('axios');
const CONFIG = require('../../config.json');
const API_URL = CONFIG.API_URL;


// Validation schema && error messages
const schema = yup.object({
  firstName: yup.string()
                .required('Nous avons besoin de votre prénom !'),
  lastName: yup.string()
               .required('Nous avons besoin de votre nom !'),
  email: yup.string()
            .required('Il nous faut votre email pour pouvoir vous contacter.')
            .email('Oups ! Ce n\'est pas un email valide.'),
  password: yup.string()
               .required('Choisissez un mot de passe.')
               .min(6, 'Le mot de passe doit contenir au moins 6 caractères.')
               .max(16, 'Le mot de passe ne peut pas contenir plus de 16 caractères.'),
  passwordConfirmation: yup.string()
                           .required('Confirmez votre mot de passe.')
                           .oneOf([yup.ref('password'), null], 'Aïe ! Les deux mots de passe ne concordent pas.'),
  phone: yup.string()
            .required('Nous avons besoin de votre numéro de téléphone pour pouvoir vous contacter.')
            .matches(/^0[6-7]\d{8}$/, 'Ce n\'est pas un numéro de téléphone portable valide.'),
  numberAndStreet: yup.string()
  					  .required('Nous avons besoin de votre adresse postale.'),
  zip: yup.string()
          .required('Veuillez renseigner votre code postal.')
          .matches(/^[0-9]{5}$/, 'Le code postal doit contenir cinq chiffres.'),
  city: yup.string()
  		   .required('Veuillez renseigner le nom de votre ville.')
});

// Send data to backend
const sendToServer = (data, props) => {
	const user = {
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		password: data.password,
		phone: data.phone,
		admin: false,
		address: {
			numberAndStreet: data.numberAndStreet,
			city: data.city,
			zip: data.zip
		}
	};
	axios.post(`${API_URL}register`, user)
	  .then(function (response) {
	    console.log(response);
	    localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
	    localStorage.setItem('accessToken', response.data.tokens.accessToken);
	    localStorage.setItem('userId', response.data.userId);
	    props.history.push('/');
	  })
	  .catch(function (error) {
	    console.log(error.message);
	  	// console.error(error.response);
	  	if (error.response) console.error(error.response);
	  	
	  	if (error.response && error.response.status === 401) {
	  		props.showAlert();
	  	}
	  });
	}



// Display && submission of the form
export default function RegisterForm(props) {
	  return (
	    <Formik
	      validationSchema={schema}
	      onSubmit={(data) => sendToServer(data, props)}
	      initialValues={{
	        firstName: '',
	        lastName: '',
	        email: '',
			password: '',
			passwordConfirmation: '',
			phone: '',
			numberAndStreet: '',
			zip: '',
			city: ''
	      }}
	    >
	      {({
	        handleSubmit,
	        handleChange,
	        handleBlur,
	        values,
	        touched,
	        isValid,
	        errors,
	      }) => (
	        <Form noValidate onSubmit={handleSubmit}>
	        	<Form.Row>
			        <Form.Group as={Col} md="6" lg="6">
						<Form.Label>Prénom</Form.Label>
						<Form.Control
						 type="text"
						 name="firstName"
			             onChange={handleChange}
			             onBlur={handleBlur}
			             value={values.firstName}
			             isValid={touched.firstName && !errors.firstName}
			             isInvalid={touched.firstName && !!errors.firstName}
						 placeholder="Charles"
						/>
						<Form.Control.Feedback type="invalid">
							{ errors.firstName }
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} md="6" lg="6">
						<Form.Label>Nom</Form.Label>
						<Form.Control
						 type="text"
						 name="lastName"
			             onChange={handleChange}
			             onBlur={handleBlur}
			             value={values.lastName}
			             isValid={touched.lastName && !errors.lastName}
			             isInvalid={touched.lastName && !!errors.lastName}
						 placeholder="Ingalls"
						/>
						<Form.Control.Feedback type="invalid">
							{ errors.lastName }
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col} md="12" lg="12">
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
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col} md="6" lg="6">
						<Form.Label>Mot de passe</Form.Label>
						<Form.Control
						 type="password"
						 name="password"
			             onChange={handleChange}
			             onBlur={handleBlur}
			             value={values.password}
			             isValid={touched.password && !errors.password}
			             isInvalid={touched.password && !!errors.password}
						 placeholder="Mot de passe"
						/>
						<Form.Control.Feedback type="invalid">
							{ errors.password }
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} md="6" lg="6">
						<Form.Label>Confirmez le mot de passe</Form.Label>
						<Form.Control
						 type="password"
						 name="passwordConfirmation"
			             onChange={handleChange}
			             onBlur={handleBlur}
			             value={values.passwordConfirmation}
			             isValid={touched.passwordConfirmation && !errors.passwordConfirmation}
			             isInvalid={touched.passwordConfirmation && errors.passwordConfirmation}
						 placeholder="Mot de passe"
						/>
						<Form.Control.Feedback type="invalid">
							{ errors.passwordConfirmation }
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col} md="12" lg="12">
						<Form.Label>Adresse</Form.Label>
						<Form.Control
						 type="text"
						 name="numberAndStreet"
			             onChange={handleChange}
			             onBlur={handleBlur}
			             value={values.numberAndStreet}
			             isValid={touched.numberAndStreet && !errors.numberAndStreet}
			             isInvalid={touched.numberAndStreet && !!errors.numberAndStreet}
						 placeholder="10 rue de la Prairie"
						/>
						<Form.Control.Feedback type="invalid">
							{ errors.numberAndStreet }
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col} md="3" lg="3">
						<Form.Label>Code postal</Form.Label>
						<Form.Control
						 type="tel"
						 name="zip"
			             onChange={handleChange}
			             onBlur={handleBlur}
			             value={values.zip}
			             isValid={touched.zip && !errors.zip}
			             isInvalid={touched.zip && !!errors.zip}
						 placeholder="12345"
						 maxLength="5"
						/>
						<Form.Control.Feedback type="invalid">
							{ errors.zip }
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} md="5" lg="5">
						<Form.Label>Ville</Form.Label>
						<Form.Control
						 type="text"
						 name="city"
			             onChange={handleChange}
			             onBlur={handleBlur}
			             value={values.city}
			             isValid={touched.city && !errors.city}
			             isInvalid={touched.city && errors.city}
						 placeholder="Amishville"
						/>
						<Form.Control.Feedback type="invalid">
							{ errors.city }
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} md="4" lg="4">
						<Form.Label>Téléphone portable</Form.Label>
						<Form.Control
						 type="tel"
						 name="phone"
			             onChange={handleChange}
			             onBlur={handleBlur}
			             value={values.phone}
			             isValid={touched.phone && !errors.phone}
			             isInvalid={touched.phone && !!errors.phone}
						 placeholder="0612345678"
						 maxLength="10"
						/>
						<Form.Control.Feedback type="invalid">
							{ errors.phone }
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>

				<div className="text-center">
					<Button type="submit" className="auth-button">Inscription</Button>
				</div>

			</Form>
		    )}
	    </Formik>
	  );
}
