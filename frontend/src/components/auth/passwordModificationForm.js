import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from'axios';
require('../../axios/axios');
const CONFIG = require('../../config.json');
const API_URL = CONFIG.API_URL;

// Validation schema && error messages
const schema = yup.object({
    password: yup.string()
                 .required('Choisissez un mot de passe.')
                 .min(6, 'Le mot de passe doit contenir au moins 6 caractères.')
                 .max(16, 'Le mot de passe ne peut pas contenir plus de 16 caractères.'),
    passwordConfirmation: yup.string()
                             .required('Confirmez votre mot de passe.')
                             .oneOf([yup.ref('password'), null], 'Aïe ! Les deux mots de passe ne concordent pas.')
  });

  // Send data to backend
const sendToServer = (data, props) => {
    const user = {
        password: data.password
    };
    axios.put(`${API_URL}auth/`, user)
      .then(function (response) {
		if(response.status === 200) {
			props.showConfirmation();
		}
      })
      .catch(function (error) {
		console.error(error);
      });
    }

// Display && submission of the form
export default function PasswordModificationForm (props) {
 
    return (
        <Formik
	      validationSchema={schema}
	      onSubmit={(data) => sendToServer(data, props)}
	      initialValues={{
            password: '',
            passwordConfirmation:''
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

				</Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
						<Form.Label>Confirmez le mot de passe</Form.Label>
						<Form.Control
						 type="password"
						 name="passwordConfirmation"
			             onChange={handleChange}
			             onBlur={handleBlur}
			             value={values.passwordConfirmation}
			             isValid={touched.passwordConfirmation && !errors.passwordConfirmation}
			             isInvalid={touched.passwordConfirmation && errors.passwordConfirmation}
						 placeholder="Confirmation de mot de passe"
						/>
						<Form.Control.Feedback type="invalid">
							{ errors.passwordConfirmation }
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
