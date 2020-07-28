import React, { Component } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import PasswordModificationForm from './passwordModificationForm';
import PersonalDetailsModificationForm from './personalDetailsModificationForm';
import AuthAlert from './authAlert';
import AuthConfirmation from './authConfirmation';
import DeleteAccount from './deleteAccount';

class SettingPage extends Component {
    state = {
        EmailDuplicateError: false,
        PasswordChangeSuccess: false,
        DetailsChangeSuccess: false,
        IdentificationError: false
      }

    hideAlert = () => {
        this.setState({ EmailDuplicateError: false })
    }

    showAlert = () => {
        this.setState({ EmailDuplicateError: true })
    }

    ErrorMessage = {
        text: 'Un compte existe déjà pour cet email.'
    }

    hidePasswordChangeConfirmation = () => {
        this.setState({ PasswordChangeSuccess: false})
    }

    showPasswordChangeConfirmation = () => {
        this.setState({ PasswordChangeSuccess: true})
    }
    
    PasswordChangeSuccessMessage = {
        text: 'Votre mot de passe a été modifié.'
    }

    hideDetailsChangeConfirmation = () => {
        this.setState({ DetailsChangeSuccess: false})
    }

    showDetailsChangeConfirmation = () => {
        this.setState({ DetailsChangeSuccess: true})
    }

    DetailsChangeSuccessMessage = {
        text: 'Vos informations ont été modifiées.'
    }

    hideIdentificationAlert = () => {
        this.setState({ IdentificationError: false })
      }

    showIdentificationAlert = () => {
        this.setState({ IdentificationError: true })
      }
  
    IdentificationMessage = {
        text: "L'email et le mot de passe ne concordent pas."
    }


    render() {
        return(
            <Container className="mt-4">
                <Tabs>
                    <Tab eventKey="Modifier votre mot de passe" title="Modifier votre mot de passe">
                        { this.state.PasswordChangeSuccess &&
                        <AuthConfirmation hideConfirmation={this.hidePasswordChangeConfirmation} message={this.PasswordChangeSuccessMessage} />}

                        <PasswordModificationForm showConfirmation={this.showPasswordChangeConfirmation} history={this.props.history}/>
                    </Tab>
                    <Tab eventKey="Modifier vos informations personnelles" title="Modifier vos informations personnelles">

                        { this.state.EmailDuplicateError &&
                        <AuthAlert hideAlert={this.hideAlert} message={this.ErrorMessage} /> }

                        { this.state.DetailsChangeSuccess &&
                        <AuthConfirmation hideConfirmation={this.hideDetailsChangeConfirmation} message={this.DetailsChangeSuccessMessage} />}

                        <PersonalDetailsModificationForm showConfirmation={this.showDetailsChangeConfirmation} showAlert={this.showAlert} history={this.props.history}/>
                    </Tab>
                    <Tab eventKey="Supprimer votre compte" title="Supprimer votre compte">
                        
                        {this.state.IdentificationError &&
                        <AuthAlert hideAlert={this.hideIdentificationAlert} message={this.IdentificationMessage} /> }

                       <DeleteAccount showAlert={this.showIdentificationAlert} history={this.props.history}/>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}
export default SettingPage;
