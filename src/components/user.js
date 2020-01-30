import React, { Component, Fragment } from 'react';
import { Form, Card, ListGroup, Col, Row, Button, Table } from 'react-bootstrap';

import axios from 'axios';

import '../resources/css/register.css';
import '../resources/css/user.css';

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
            application: [
                {
                startdate: "",
                enddate: "",
                competence: "",
                years_of_experience: "",
                firstname: "",
                lastname: "",
                name: "",
                time_of_submission: ""
            }
            ] 
        }
    }
    componentDidMount = async () => {
        const user = await (await axios.get('/api/user')).data.user;
        const application = (await axios.get('api/application')).data;
        console.log(application)
        this.setState({ user: user, application: application })
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
                <Row>
                    <Col md="auto">
                        {this.renderUserInfo()}
                    </Col>
                    <Col md="auto">
                        {this.renderApplication()}
                    </Col>
                </Row>

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
            <Fragment>
                <Table striped bordered hover className="tableCompetence">
                        <thead>
                            <tr>
                                <th>{this.props.info.user[7].availability}</th>
                                <th>{this.props.info.user[7].competence}</th>
                                <th>{this.props.info.user[7].yearsOfExperience}</th>
                                <th>{this.props.info.user[7].dateOfSubmission}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.application.map((application, key) =>
                                <tr>
                                    <td> {application.startdate.split('T')[0]} {this.props.info.user[7].to} {application.enddate.split('T')[0]}</td>
                                    <td> {application.name}</td>
                                    <td> {application.years_of_experience}</td>
                                    <td> {application.time_of_submission.split('T')[0]}</td>
                                </tr>
                            )}

                        </tbody>
                    </Table>

            </Fragment>
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
    renderUserComplete() {
        return (
            <h1>User not logged in</h1>
        )
    }

    render() {
        return (
            <div>
                {this.renderUser()}
            </div >
        );
    };
}
export default User