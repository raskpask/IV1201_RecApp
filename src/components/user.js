import React, { Component, Fragment } from 'react';
import { Card, ListGroup } from 'react-bootstrap';


import axios from 'axios';
import Application from './fragments/application';
import Access from './fragments/access';
import { errorCodes } from '../model/dbErrors'
import { toast } from 'react-toastify';

import '../resources/css/register.css';
import '../resources/css/user.css';


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderApplication: "",
            typeOfUser: "",
            noApplication: false,
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
        try {
            const user = await (await axios.get('/api/user')).data.user;
            const application = (await axios.get('api/application')).data[0];
            this.setState({ user: user, application: JSON.parse(application) })
            this.setState({ renderApplication: this.renderApplication() })
            console.log(this.state.application)
            this.privilege()
        } catch (error) {
            if (error.response.data === errorCodes.NO_APPLICATION_ERROR.code) {
                this.setState({ noApplication: true });
            } else {
                toast(this.props.info.general.error)
            }
        }
    }
    privilege() {
        const privilegeLevel = document.cookie.split('privilegeLevel=')[1].split(';')[0];
        if (privilegeLevel === '1') {
            this.setState({ typeOfUser: this.renderUserInfo() })
        } else if (privilegeLevel === '2') {
            this.setState({ typeOfUser: this.renderApplication() })
        } else {
            this.setState({ typeOfUser: this.renderUserNotLoggedIn() })
        }
        this.forceUpdate()
    }
    renderNoApplicationMessage = () => {
        return (
            <Fragment>

                <div className="noApplicationMessage">
                    {this.props.info.user[9].noApplicationMessage}
                </div>
            </Fragment>
        )
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
    renderUserNotLoggedIn() {
        return (
            <h1>User not logged in</h1>
        )
    }
    renderRecruiter() {
        return (
            <h1>The user does not have an application</h1>
        )
    }
    render() {
        return (
            <div>
                {(this.state.noApplication) ? this.renderNoApplicationMessage() : null}
                <Access access='2' info={this.props.info.access} />
                {this.state.typeOfUser}
            </div >
        );
    };
}
export default User