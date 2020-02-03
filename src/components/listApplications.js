import React, { Component, Fragment, useState } from 'react';
import { Table, Button, FormControl, Form, NavDropdown, Nav, Navbar, InputGroup, Dropdown, Modal, Col, Row } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';

import '../resources/css/register.css';
import '../resources/css/listApplications.css';
import Application from './fragments/application';
import axios from 'axios';

class ListApplications extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            showUser: false,
            startDate: "",
            endDate: "",
            submissionEndDate: "",
            submissionStartDate: "",
            submissionFocusedInput: "",
            filterName: "",
            filteredCompetences: [],
            appNumber: "",
            competences: [],
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
        this.getApplicationsAndCompetences();
    }
    sendFilter = () => {
        console.log(this.state.filteredCompetences);
        this.setState({ show: false })
    }
    getApplicationsAndCompetences = () => {
        axios
            .get('/api/application')
            .then(res => {
                axios
                    .get('/api/competence')
                    .then(res => {
                        this.setState({ competences: res.data })
                        this.state.competences.map(competence =>
                            {this.state.filteredCompetences[competence.competence_id]=true}
                            )
                        console.log(this.state.competences)
                    })
                    .catch(err => console.log(err))
                this.setState({ application: this.parseApplications(res.data) })

            })
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
        // console.log(this.state.application)
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{this.props.info.listApplications.firstName}</th>
                        <th>{this.props.info.listApplications.lastName}</th>
                        <th>{this.props.info.listApplications.applicationDate}</th>
                        <th>{this.props.info.listApplications.moreInfo}</th>

                    </tr>
                </thead>
                <tbody>
                    {this.state.application.map((application, key) =>
                        <tr key={key} className="pressForInfo">
                            <td key={"name: " + key} className="pressForInfo" >{this.renderFullApplication(application, application.firstName, false)}</td>
                            <td key={"lastName: " + key} > {this.renderFullApplication(application, application.lastName, false)}</td>
                            <td key={"applicationDate: " + key} > {this.renderFullApplication(application, application.dateOfSubmission, false)}</td>
                            <td key={"moreInfo: " + key} > {this.renderFullApplication(application, this.props.info.listApplications.info, true)}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
    // <Application info={this.props.info} application={application} />
    changeApplicationStatus = (status, id) => {
        axios
            .put('/api/application', { status: status, id: id })
            .then(res =>
                console.log(res.status))
            .catch(err =>
                console.error(err))
    }
    renderFullApplication(application, name, button) {
        return (
            <Fragment>
                {button ? <Button variant="primary" className="ml-auto" onClick={() => this.setState({ showUser: true })}>{name}</Button> : <a className=" ml-auto" onClick={() => this.setState({ showUser: true })}>{name}</a>}

                <Modal
                    centered
                    show={this.state.showUser}
                    onHide={() => this.setState({ showUser: false })}
                    animation={true}
                    size='xl'
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.info.listApplications.application}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Application info={this.props.info} application={application} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ showUser: false })} className="margin">{this.props.info.listApplications.close}</Button>
                        <Button onClick={() => this.changeApplicationStatus(1, application.id)} className="margin">{this.props.info.listApplications.accept}</Button>
                        <Button onClick={() => this.changeApplicationStatus(2, application.id)} className="margin">{this.props.info.listApplications.reject}</Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
    renderFilter() {
        return (
            <Nav>
                <Button variant="primary ml-auto" onClick={() => this.setState({ show: true })}>
                    Add filter
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={() => this.setState({ show: false })}
                    animation={true}
                    size='xl'>

                    <Modal.Header closeButton>
                        <Modal.Title>Apply filters for your search</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.renderSearch()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ show: false })}>Close</Button>
                        <Button variant="secondary" onClick={() => this.sendFilter()}>Search</Button>
                    </Modal.Footer>
                </Modal>
            </Nav>
        )
    }
    renderSearch() {
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h3>Competences</h3>
                        {this.state.competences.map(competence =>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Checkbox
                                        defaultChecked={true}
                                        onChange={() => this.state.filteredCompetences[competence.competence_id] ? this.state.filteredCompetences[competence.competence_id]=false : this.state.filteredCompetences[competence.competence_id]=true}


                                    />
                                </InputGroup.Prepend>
                                <InputGroup.Text>{competence.name}</InputGroup.Text>
                            </InputGroup>
                        )}

                    </Col>
                    <Col>
                        <h3>Availability</h3>
                        <DateRangePicker
                            displayFormat={() => "DD/MM/YYYY"}
                            startDate={this.state.startDate}
                            // startDateId="your_unique_start_date_id" 
                            endDate={this.state.endDate}
                            // endDateId="your_unique_end_date_id" 
                            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                            focusedInput={this.state.focusedInput}
                            onFocusChange={focusedInput => this.setState({ focusedInput })}
                        />
                    </Col>
                    <Col>
                        <h3>Submission date</h3>
                        <DateRangePicker
                            displayFormat={() => "DD/MM/YYYY"}
                            startDate={this.state.submissionStartDate}
                            // startDateId="your_unique_start_date_id" 
                            endDate={this.state.submissionEndDate}
                            // endDateId="your_unique_end_date_id" 
                            onDatesChange={({ startDate, endDate }) => this.setState({ submissionStartDate: startDate, submissionEndDate: endDate })}
                            focusedInput={this.state.submissionFocusedInput}
                            onFocusChange={focusedInput => this.setState({ submissionFocusedInput: focusedInput })}
                        />
                    </Col>
                    <Col>
                        <h3>Name</h3>
                        <FormControl aria-label="Text input with checkbox" value={this.state.filterName} onChange={event => this.setState({ filterName: event.target.value })} />
                    </Col>
                </Row>
            </Fragment>
        )
    }
    render() {
        return (
            <div>
                {this.renderFilter()}
                {/* {this.renderSearch()} */}
                {this.renderTable()}
            </div >
        );
    };
}
export default ListApplications