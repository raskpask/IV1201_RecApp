import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from 'axios';

import '../resources/css/register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "",
                password: "",
                email: "",
                date: "",
                firstName: "",
                lastName: ""

            },
            formErrors:{email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false,
            submitted: false
        }
    }

    registerUser = async () => {
        try {
            const user = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                date: this.state.date,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            }
            const response = await axios.post('/api/user',user);

            if (response.status === 200) {
                this.setState({ submitted: true });
            }

        } catch (error) {
            console.log(error);
        }
    }
    renderRegisterForm = () => {
        return (<Form className="registerForm">
            <h1>Register</h1>
            <Form.Label>{this.props.info.register[0].name}</Form.Label>
            <Form.Control
                value={this.state.username}
                onChange={event => this.setState({ username: event.target.value })}
                type="username"
                placeholder={this.props.info.register[0].placeholder} />
            <Form.Label>{this.props.info.register[1].name}</Form.Label>
            <Form.Control
                type="password"
                onChange={event => this.setState({ password: event.target.value }),event => { this.validateField('password', event.target.value) }}
                placeholder={this.props.info.register[1].placeholder} />
            <Form.Label>{this.props.info.register[2].name}</Form.Label>
            <Form.Control
                type="email"
                onChange={event => this.setState({ email: event.target.value }), event => { this.validateField('email', event.target.value) }}
                placeholder={this.props.info.register[2].placeholder} />
            <Form.Label>{this.props.info.register[3].name}</Form.Label>
            <Form.Control
                type="date"
                onChange={event => this.setState({ date: event.target.value })}
                placeholder={this.props.info.register[3].placeholder} />
            <Form.Label>{this.props.info.register[4].name}</Form.Label>
            <Form.Control
                type="name"
                onChange={event => this.setState({ firstName: event.target.value })}
                placeholder={this.props.info.register[4].placeholder} />
            <Form.Label>{this.props.info.register[5].name}</Form.Label>
            <Form.Control
                type="name"
                onChange={event => this.setState({ lastName: event.target.value })}
                placeholder={this.props.info.register[5].placeholder} />
            <Button className="registerButton" disabled={!this.state.passwordValid} onClick={() => this.registerUser()} variant="primary" >Register</Button>
        </Form>)
    }
        
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
    
        switch(fieldName) {
        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
        case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
        default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid
                    }, this.validateForm);
    }
    
    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    renderRegisterComplete() {
        return (
            <h1>Reg OK</h1>
        )
    }

    render() {
        return (
            <div>
                {this.state.submitted ? this.renderRegisterComplete() : this.renderRegisterForm()}
            </div >
        );
    };

  
}
export default Register