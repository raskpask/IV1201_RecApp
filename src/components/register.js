import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import { validator } from '../model/formValidation';
import '../resources/css/register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: { value: '', name: this.props.info.register.username.name, isValid: false, isInvalid: false, valueHasChanged: false, message: '' },
                password: { value: '', name: this.props.info.register.password.name,isValid: false, isInvalid: false, valueHasChanged: false, message: '' },
                confirmPassword: { value: '', name: this.props.info.register.password.name, isValid: false, isInvalid: false, message: '' },
                email: { value: '', name:  this.props.info.register.email.name, isValid: false, isInvalid: false, message: '' },
                date: { value: '', name:  this.props.info.register.date.name, isValid: false, isInvalid: false, message: '' },
                firstName: { value: '', name:  this.props.info.register.firstName.name, isValid: false, isInvalid: false, message: '' },
                lastName: { value: '', name:  this.props.info.register.lastName.name, isValid: false, isInvalid: false, message: '' },
                validated: false
            },
            submitted: false,

        }
    }
    //Used for checking validation after a onChange event
    checkValidation = (type, state) =>{
      const validState = validator(type, state.user, this.props.info.validationError);
      this.setState({
        ...this.state,
        user:{
          ...this.state.user,
          ...validState
        }
      })
    }
    //Called from the subbmitt button
    handleSubmit = (event) => {
      event.preventDefault();
      const validState = validator(null, this.state.user, this.props.info.validationError);
      this.setState({
        ...this.state,
        user:{
          ...validState
        }
      })
      if(validState.validated){
        //this console log can be removed
        console.log("Success form submission!");
        this.registerUser();
      }else{
        //this console log can be removed
        console.log("Unsuccessfull form submission");
      }
    }
    onChange = (e) => {
      const state = {
        ...this.state,
        user:{
          ...this.state.user,
          [e.target.name]: {
            ...this.state.user[e.target.name],
            value: e.target.value,
          }
        }
      }
      this.setState(state);
      this.checkValidation(e.target.name, state);
    }

    //Function that registers the user(calls API)
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
      const { username, password, confirmPassword, email, date, firstName, lastName} = this.state.user;
      return (
        <div>
          <Form noValidate className="registerForm" validated={this.state.user.validated} onSubmit={this.handleSubmit}>
            <h1>Register</h1>
            <Form.Group>
              <Form.Label>{ this.props.info.register.firstName.name}</Form.Label>
                <Form.Control
                    value={firstName.value}
                    onChange={this.onChange}
                    type="text"
                    name="firstName"
                    isInvalid={firstName.isInvalid}
                    isValid={firstName.isValid}
                    placeholder={ this.props.info.register.firstName.placeholder}/>
                <Form.Control.Feedback type="invalid">
                  {firstName.message}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>{ this.props.info.register.lastName.name}</Form.Label>
                <Form.Control
                    value={lastName.value}
                    onChange={this.onChange}
                    type="text"
                    name="lastName"
                    isInvalid={lastName.isInvalid}
                    isValid={lastName.isValid}
                    placeholder={ this.props.info.register.lastName.placeholder}/>
                <Form.Control.Feedback type="invalid">
                  {lastName.message}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>{ this.props.info.register.email.name}</Form.Label>
                <Form.Control
                    value={email.value}
                    onChange={this.onChange}
                    type="text"
                    name="email"
                    isInvalid={email.isInvalid}
                    isValid={email.isValid}
                    placeholder={ this.props.info.register.email.placeholder}/>
                <Form.Control.Feedback type="invalid">
                  {email.message}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>{ this.props.info.register.date.name}</Form.Label>
              <Form.Control
                  value={date.value}
                  onChange={this.onChange}
                  type="date"
                  name="date"
                  isInvalid={date.isInvalid}
                  isValid={date.isValid}
                  placeholder={ this.props.info.register.firstName.placeholder}/>
              <Form.Control.Feedback type="invalid">
                {date.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>{ this.props.info.register.username.name}</Form.Label>
                <Form.Control
                    value={username.value}
                    onChange={this.onChange}
                    type="text"
                    name="username"
                    isInvalid={username.isInvalid}
                    isValid={username.isValid}
                    placeholder={ this.props.info.register.username.placeholder}/>
                <Form.Control.Feedback type="invalid">
                  {username.message}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>{ this.props.info.register.password.name}</Form.Label>
                <Form.Control
                    value={password.value}
                    onChange={this.onChange}
                    type="password"
                    name="password"
                    isInvalid={password.isInvalid}
                    isValid={password.isValid}
                    placeholder={ this.props.info.register.password.placeholder}/>
                <Form.Control.Feedback type="invalid">
                  {password.message}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Control
                    value={confirmPassword.value}
                    onChange={this.onChange}
                    type="password"
                    name="confirmPassword"
                    isInvalid={confirmPassword.isInvalid}
                    isValid={confirmPassword.isValid}
                    placeholder={ this.props.info.register.password.placeholder}/>
                <Form.Control.Feedback type="invalid">
                  {confirmPassword.message}
                </Form.Control.Feedback>
            </Form.Group>
            <Button className="registerButton" type="submit" variant="primary">Register</Button>
          </Form>
        </div>)
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
