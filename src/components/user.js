import React, { Component, Fragment } from 'react';
import { Form, Card, ListGroup, Button } from 'react-bootstrap';


import axios from 'axios';
import Application from './fragments/application';

import '../resources/css/register.css';
import '../resources/css/user.css';


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderApplication: "",
            typeOfUser: "",
            user: {
                username: "",
                password: "",
                email: "",
                date: "",
                firstName: "",
                lastName: ""
            },
            application: [
                {
                    firstName: "",
                    lastName: "",
                    dateOfBirth: "",
                    lastEdited: "",
                    dateOfSubmission: "",
                    status: "",
                    id: "",
                    competence: [
                        {
                            name: "",
                            yearsOfExperience: ""
                        }
                    ],
                    availability: [
                        {
                            startDate: "",
                            endDate: ""
                        }

                    ]
                }
            ]
        }
    }

    componentDidMount = async () => {
        const user = await (await axios.get('/api/user')).data.user;
        const application = (await axios.get('api/application')).data[0];
        this.setState({ user: user, application: JSON.parse(application) })
        this.setState({renderApplication: this.renderApplication()})
        console.log(this.state.application)
        const privilegeLevel = document.cookie.split('privilegeLevel=')[1];
        if (privilegeLevel === '1') {
            this.setState({ typeOfUser: this.renderUserInfo() })
        } else if(privilegeLevel === '2'){
            this.setState({ typeOfUser: this.renderApplication()})
        } else{
            this.setState({ typeOfUser: this.renderUserNotLoggedIn() })
        }
    }
    privilege(){
        const privilegeLevel = document.cookie.split('privilegeLevel=')[1];
        if (privilegeLevel === '1') {
            this.setState({ typeOfUser: this.renderUserInfo() })
        } else if(privilegeLevel === '2'){
            this.setState({ typeOfUser: this.renderAppli()})
        } else{
            this.setState({ typeOfUser: this.renderUserNotLoggedIn() })
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
            const response = await axios.put('/api/user', user);

            if (response.status === 200) {
                this.setState({ submitted: true });
            }

        } catch (error) {
            console.log(error);
        }
    }
    renderUser = () => {
        return (
            <Fragment>
                {this.renderApplication()}
            </Fragment>
        )
    }
    renderUserInfo() {
        return (
            <Card className="userInfo">
                <Card.Header>
                    {this.props.info.user[6].name}{this.state.user.firstName} {this.state.user.lastName}!

                    </Card.Header>
                <ListGroup variant="flush">

                    <ListGroup.Item>{this.props.info.user[0].name}{this.state.user.username}</ListGroup.Item>
                    <ListGroup.Item>{this.props.info.user[2].name}{this.state.user.email}</ListGroup.Item>
                    <ListGroup.Item>{this.props.info.user[3].name}{this.state.user.date}</ListGroup.Item>
                </ListGroup>
            </Card>
        )
    }
    renderApplication() {
        return (
            <div className="marginTop">
                <Application info={this.props.info} application={this.state.application} />
            </div>
        )
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
            <Button className="userButton" onClick={() => this.updateUser()} variant="primary">User</Button>
        </Form>)
    }
    renderUserNotLoggedIn() {
        return (
            <h1>User not logged in</h1>
        )
    }
    renderRecruiter(){
        return(
            <h1>The user does not have an application</h1>
        )
    }

    render() {
        return (
            <div>
                {this.state.typeOfUser}
            </div >
        );
    };
}
export default User