import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import '../resources/css/register.css';
import axios from 'axios';

class ListApplications extends Component {
    constructor(props) {
        super(props)
        this.state = {
            application:[
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
    componentDidMount = async () =>{
        const res =await axios.get('/api/application').data;
        console.log(res);
    }
    renderTable(){
        return(
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
                            <td key={"name: " + key}> {application.firstName}</td>
                            <td key={"lastName: " + key}> {application.lastName}</td>
                            <td key={"applicationDate: " + key}> {application.dateOfSubmission}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
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