import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Popup from "reactjs-popup";

import '../resources/css/register.css';
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
                            <td key={"name: " + key} >{application.firstName}{this.renderFullApplication()}</td>
                            <td key={"lastName: " + key} > {application.lastName}</td>
                            <td key={"applicationDate: " + key} > {application.dateOfSubmission}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
    renderFullApplication(number) {
        return (
            <Popup trigger={<button>Trigger</button>} position="top left">
                {close => (
                    <div>
                        Content here
        <a className="close" onClick={close}>
                            &times;
        </a>
                    </div>
                )}
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