import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from 'axios';

import '../resources/css/register.css';

class User extends Component {
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
            submitted: false
        }
    }

    updateUser = async () => {
        try {
            const user = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                date: this.state.date,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            }
            const response = await axios.put('/api/user',user);

            if (response.status === 200) {
                this.setState({ submitted: true });
            }

        } catch (error) {
            console.log(error);
        }
    }
    renderUserForm = () => {
        return (<Form className="userForm">
            <h1>User</h1>
            <Form.Label>{this.props.info.user[0].name}</Form.Label>
            <Form.Control
                value={this.state.username}
                onChange={event => this.setState({ username: event.target.value })}
                type="username"
                placeholder={this.props.info.user[0].placeholder} />
            <Form.Label>{this.props.info.user[1].name}</Form.Label>
            <Form.Control
                type="password"
                onChange={event => this.setState({ password: event.target.value })}
                placeholder={this.props.info.user[1].placeholder} />
            <Form.Label>{this.props.info.user[2].name}</Form.Label>
            <Form.Control
                type="email"
                onChange={event => this.setState({ email: event.target.value })}
                placeholder={this.props.info.user[2].placeholder} />
            <Form.Label>{this.props.info.user[3].name}</Form.Label>
            <Form.Control
                type="date"
                onChange={event => this.setState({ date: event.target.value })}
                placeholder={this.props.info.user[3].placeholder} />
            <Form.Label>{this.props.info.user[4].name}</Form.Label>
            <Form.Control
                type="name"
                onChange={event => this.setState({ firstName: event.target.value })}
                placeholder={this.props.info.user[4].placeholder} />
            <Form.Label>{this.props.info.user[5].name}</Form.Label>
            <Form.Control
                type="name"
                onChange={event => this.setState({ lastName: event.target.value })}
                placeholder={this.props.info.user[5].placeholder} />
            <Button className="userButton" onClick={() => this.userUser()} variant="primary">User</Button>
        </Form>)
    }
    renderUserComplete() {
        return (
            <h1>Reg OK</h1>
        )
    }

    render() {
        return (
            <div>
                {this.state.submitted ? this.renderUserComplete() : this.renderUserForm()}
            </div >
        );
    };
}
export default User