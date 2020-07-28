import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
require('../../axios/axios');
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
		phone: data.phone,
		admin: false,
		address: {
			numberAndStreet: data.numberAndStreet,
			city: data.city,
			zip: data.zip
		}
	};
	axios.put(`${API_URL}auth/`, user)
	  .then(function (response) {
		if(response.status === 200) {
			props.showConfirmation();
		}
	  })
	  .catch(function (error) {
		console.error(error);
		if(error.response && error.response.data.error === 'EmailDuplicateError' ) {
			props.showAlert();
		}
	  });
	}



// Display && submission of the form
export default function PersonalDetailsModificationForm(props) {
	// console.log(props);
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [phone, setPhone] = useState();
	const [street, setStreet] = useState();
	const [zip, setZip] = useState();
	const [city, setCity] = useState();

	useEffect(() => {
		axios.get('http://localhost:3001/auth/')
		.then((response) =>{
			if(response.status === 200) {
				// console.log(response.data); 
				setFirstName(response.data.firstName);
				setLastName(response.data.lastName);
				setEmail(response.data.email);
				setPhone(response.data.phone);
				setStreet(response.data.address.numberAndStreet);
				setZip(response.data.address.zip);
				setCity(response.data.address.city);
			}
		});
	}, []);
	// console.log('up');
	return !city ? (<div>Loading</div>) : (
		<Formik
	      validationSchema={schema}
	      onSubmit={(data) => sendToServer(data, props)}
	      initialValues={{
			firstName: firstName,
	        lastName: lastName,
	        email: email,
			phone: phone,
			numberAndStreet: street,
			zip: zip,
			city: city
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
	        <Form className="form mx-auto mt-4" noValidate onSubmit={handleSubmit}>
	        	<Form.Row>
			        <Form.Group as={Col} >
						<Form.Label>Prénom</Form.Label>
						<Form.Control
						 type="text"
						 name="firstName"
			             onChange={handleChange}
			             onBlur={handleBlur}
			             value={values.firstName}
			             isValid={touched.firstName && !errors.firstName}
			             isInvalid={touched.firstName && !!errors.firstName}
						 placeholder="Prénom"
						/>
						<Form.Control.Feedback type="invalid">
							{ errors.firstName }
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} >
						<Form.Label>Nom</Form.Label>
						<Form.Control
						 type="text"
						 name="lastName"
			             onChange={handleChange}
			             onBlur={handleBlur}
			             value={values.lastName}
			             isValid={touched.lastName && !errors.lastName}
			             isInvalid={touched.lastName && !!errors.lastName}
						 placeholder="Nom"
						/>
						<Form.Control.Feedback type="invalid">
							{ errors.lastName }
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Email</Form.Label>
						<Form.Control
						 type="email"
						 name="email"
			             onChange={handleChange}
			             onBlur={handleBlur}
			             value={values.email}
			             isValid={touched.email && !errors.email}
			             isInvalid={touched.email && !!errors.email}
						 placeholder="Email"
						/>
						<Form.Control.Feedback type="invalid">
							{ errors.email }
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col} >
						<Form.Label>Adresse</Form.Label>
						<Form.Control
						 type="text"
						 name="numberAndStreet"
			             onChange={handleChange}
			             onBlur={handleBlur}
			             value={values.numberAndStreet}
			             isValid={touched.numberAndStreet && !errors.numberAndStreet}
			             isInvalid={touched.numberAndStreet && !!errors.numberAndStreet}
						 placeholder="Numéro et la voie"
						/>
						<Form.Control.Feedback type="invalid">
							{ errors.numberAndStreet }
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col} >
						<Form.Label>Code postal</Form.Label>
						<Form.Control
						 type="tel"
						 name="zip"
			             onChange={handleChange}
			             onBlur={handleBlur}
			             value={values.zip}
			             isValid={touched.zip && !errors.zip}
			             isInvalid={touched.zip && !!errors.zip}
						 placeholder="Code postal"
						 maxLength="5"
						/>
						<Form.Control.Feedback type="invalid">
							{ errors.zip }
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col}>
						<Form.Label>Ville</Form.Label>
						<Form.Control
						 type="text"
						 name="city"
			             onChange={handleChange}
			             onBlur={handleBlur}
			             value={values.city}
			             isValid={touched.city && !errors.city}
			             isInvalid={touched.city && errors.city}
						 placeholder="Ville"
						/>
						<Form.Control.Feedback type="invalid">
							{ errors.city }
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} >
						<Form.Label>Téléphone portable</Form.Label>
						<Form.Control
						 type="tel"
						 name="phone"
			             onChange={handleChange}
			             onBlur={handleBlur}
			             value={values.phone}
			             isValid={touched.phone && !errors.phone}
			             isInvalid={touched.phone && !!errors.phone}
						 placeholder="numéro de tél"
						 maxLength="10"
						/>
						<Form.Control.Feedback type="invalid">
							{ errors.phone }
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>

				<div className="text-center">
					<Button type="submit" className="auth-button">Modifier</Button>
				</div>

			</Form>
		    )}
	    </Formik>
	  );
}
