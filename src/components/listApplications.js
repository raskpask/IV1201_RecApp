import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import Popup from "reactjs-popup";

import '../resources/css/register.css';
import '../resources/css/listApplications.css';
import Application from './fragments/application';
import axios from 'axios';

class ListApplications extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showUser: "",
            appNumber: "",
            application: [
                {
                    firstName: "",
                    lastName: "",
                    dateOfBirth: "",
                    lastEdited: "",
                    dateOfSubmission: "",
                    status: "",
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
        this.getApplications()
    }
    getApplications = () => {
        axios
            .get('/api/application')
            .then(res =>

                this.setState({ application: this.parseApplications(res.data) }
                ))
            .catch(err => console.log(err))
    }
    parseApplications(applications) {
        let listOfApplications = [];
        for (let app of applications) {
            listOfApplications.push(JSON.parse(app));
        }
        return listOfApplications
    }
    renderTable() {
        console.log(this.state.application)
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{this.props.info.listApplications.firstName}</th>
                        <th>{this.props.info.listApplications.lastName}</th>
                        <th>{this.props.info.listApplications.applicationDate}</th>

                    </tr>
                </thead>
                <tbody>
                    {this.state.application.map((application, key) =>
                        <tr key={key}>
                            <td key={"name: " + key} >{this.renderFullApplication(application)}</td>
                            <td key={"lastName: " + key} > {application.lastName}</td>
                            <td key={"applicationDate: " + key} > {application.dateOfSubmission}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
    // <Application info={this.props.info} application={application} />
    renderFullApplication(application) {
        return (
            <Popup modal trigger={<a>{application.firstName}</a>}>
            
                <Application info={this.props.info} application={application} />
                <Button>Close</Button>
                <Button>Accept</Button>
                <Button>Reject</Button>
            </Popup>
        );
    }
    render() {
        return (
            <div>
                {this.renderTable()}

            </div >
        );
    };
}
export default ListApplications