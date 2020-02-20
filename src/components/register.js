import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { errorCodes } from '../model/dbErrors'
import { toast } from 'react-toastify';


import Spinner from 'react-bootstrap/Spinner'
import { validator } from '../model/formValidation';
import '../resources/css/register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: { value: '', name: this.props.info.register.username.name, isValid: false, isInvalid: false, valueHasChanged: false, message: '', alreadyTakenUsernames:[] },
        password: { value: '', name: this.props.info.register.password.name, isValid: false, isInvalid: false, valueHasChanged: false, message: '' },
        confirmPassword: { value: '', name: this.props.info.register.password.name, isValid: false, isInvalid: false, message: '' },
        email: { value: '', name: this.props.info.register.email.name, isValid: false, isInvalid: false, message: '' },
        date: { value: '', name: this.props.info.register.date.name, isValid: false, isInvalid: false, message: '' },
        firstName: { value: '', name: this.props.info.register.firstName.name, isValid: false, isInvalid: false, message: '' },
        lastName: { value: '', name: this.props.info.register.lastName.name, isValid: false, isInvalid: false, message: '' },
        validated: false
      },
      isLoading:false,
      usernameValidationLoading: false,
      usernameValidationWaitingTime: 3,
      usernmaeValidationStartTime:0,
      submitted: false,

    }
  }
  checkUsername = async (usernameValue) =>{
    try{
      const name = { username:usernameValue };
      const response = await axios.get('/api/username', name);
      console.log(name);
      console.log("RESPONSE: "+ response.data);
    }catch(error){
      toast(this.props.info.general.error)
      console.log("ERROR: "+error);
    }
  }
  checkValidation = (type, state) => {
    const validState = validator(type, state.user, this.props.info.validationError);
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        ...validState
      }
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const validState = validator(null, this.state.user, this.props.info.validationError);
    this.setState({
      ...this.state,
      user: {
        ...validState
      }
    })
    if (validState.validated) {
      this.registerUser();
    } 
  }
  onChange = (e) => {
    const state = {
      ...this.state,
      user: {
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
    this.setState({
      isLoading: true,
      submitted: false,
    });
    const user = {
      username: this.state.user.username.value,
      password: this.state.user.password.value,
      email: this.state.user.email.value,
      date: this.state.user.date.value,
      firstName: this.state.user.firstName.value,
      lastName: this.state.user.lastName.value
    }
    try {
      const response = await axios.post('/api/user', user);
      if (response.status === 200) {
        this.setState({ submitted: true });
      }
    }catch (error) {
      if(error.response.data === errorCodes.DUPLICATE_USER_ERROR.code){
        const state = { 
          ...this.state,
          user: {
            ...this.state.user,
            username:{
              ...this.state.user.username,
              alreadyTakenUsernames:[
                ...this.state.user.username.alreadyTakenUsernames,
                this.state.user.username.value
              ]
            }
          }
        };
        this.checkValidation(null,state);

      }else{
        toast(this.props.info.general.error)
        console.log(error)
        this.setState({
          isLoading: false,
        });
      }
    }
  }
  renderRegisterForm = () => {
    const { username, password, confirmPassword, email, date, firstName, lastName } = this.state.user;
    return (
      <div>
        <Form noValidate className="registerForm" validated={this.state.user.validated} onSubmit={this.handleSubmit}>
          <h1>{this.props.info.register.register}</h1>
          <Form.Group>
            <Form.Label>{this.props.info.register.firstName.name}</Form.Label>
            <Form.Control
              value={firstName.value}
              onChange={this.onChange}
              
              type="text"
              name="firstName"
              isInvalid={firstName.isInvalid}
              isValid={firstName.isValid}
              placeholder={this.props.info.register.firstName.placeholder} />
            <Form.Control.Feedback type="invalid">
              {firstName.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>{this.props.info.register.lastName.name}</Form.Label>
            <Form.Control
              value={lastName.value}
              onChange={this.onChange}
              type="text"
              name="lastName"
              isInvalid={lastName.isInvalid}
              isValid={lastName.isValid}
              placeholder={this.props.info.register.lastName.placeholder} />
            <Form.Control.Feedback type="invalid">
              {lastName.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>{this.props.info.register.email.name}</Form.Label>
            <Form.Control
              value={email.value}
              onChange={this.onChange}
              type="text"
              name="email"
              isInvalid={email.isInvalid}
              isValid={email.isValid}
              placeholder={this.props.info.register.email.placeholder} />
            <Form.Control.Feedback type="invalid">
              {email.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>{this.props.info.register.date.name}</Form.Label>
            <Form.Control
              value={date.value}
              onChange={this.onChange}
              type="date"
              name="date"
              isInvalid={date.isInvalid}
              isValid={date.isValid}
              placeholder={this.props.info.register.firstName.placeholder} />
            <Form.Control.Feedback type="invalid">
              {date.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>{this.props.info.register.username.name}</Form.Label>
            <Row>
            <Col>
            <Form.Control
              value={username.value}
              onChange={this.onChange}
              type="text"
              name="username"
              isInvalid={username.isInvalid }
              isValid={ username.isValid }
              placeholder={this.props.info.register.username.placeholder}/>
            <Form.Control.Feedback type="invalid">
              { username.message }
            </Form.Control.Feedback>
            </Col>
            {
            //this is for displaying the loading circle when username validation is loading 
            this.state.usernameValidationLoading ? 
            <Col md="auto" className="spinner">
            <Spinner animation="border" role="status" size="sm">
                <span className="sr-only">{this.props.info.general.loading}</span>
            </Spinner>
            </Col>:
            null
            }

            </Row>
          </Form.Group>
          <Form.Group>
            <Form.Label>{this.props.info.register.password.name}</Form.Label>
            <Form.Control
              value={password.value}
              onChange={this.onChange}
              type="password"
              name="password"
              isInvalid={password.isInvalid}
              isValid={password.isValid}
              placeholder={this.props.info.register.password.placeholder} />
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
              placeholder={this.props.info.register.password.placeholder} />
            <Form.Control.Feedback type="invalid">
              {confirmPassword.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="primary" disabled={this.state.isLoading}>
            {this.state.isLoading ? this.props.info.general.loading : this.props.info.register.register}
          </Button>
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
      <div className="marginTop">
        {this.state.submitted ? this.renderRegisterComplete() : this.renderRegisterForm()}
      </div >
    );
  };
}
export default Register
