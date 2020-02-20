import React, { Component, Fragment } from 'react';
import { Table, Button, FormControl, Form, Nav, Modal, Col, Row } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';

import '../resources/css/register.css';
import '../resources/css/listApplications.css';
import Application from './fragments/application';
import axios from 'axios';
import Access from './fragments/access';
import { toast } from 'react-toastify';
const APPLICATION_EDITED = 'APPLICATION_EDITED_ERROR';
const NO_APPLICATION = 'NO_APPLICATION_ERROR';

class ListApplications extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timestamp: "",
            show: false,
            showUser: [],
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
        this.setState({ timestamp: new Date() })
        this.getApplicationsAndCompetences();
    }
    sendFilter = () => {
        let competences = this.state.filteredCompetences.filter(Boolean);
        const application = {
            availability: {
                startDate: this.state.startDate ? this.state.startDate.format('YYYY-MM-DD') : "",
                endDate: this.state.endDate ? this.state.endDate.format('YYYY-MM-DD') : ""
            },
            applicationDate: {
                startDate: this.state.submissionStartDate ? this.state.submissionStartDate.format('YYYY-MM-DD') : "",
                endDate: this.state.submissionEndDate ? this.state.submissionEndDate.format('YYYY-MM-DD') : ""
            },
            competence: competences,
            name: this.state.filterName
        }
        axios
            .get('/api/application', { params: { application } })
            .then(res => {
                this.setState({ application: this.parseApplications(res.data) })
                this.setState({ show: false })
            })
            .catch(err => {
                console.log(err)
                if (err.response.data === NO_APPLICATION) {
                    this.setState({ show: false })
                    toast(this.props.info.listApplications.noApplications)
                } else {
                    toast(this.props.info.general.error)
                }
            })
    }
    getApplicationsAndCompetences = () => {
        axios
            .get('/api/application')
            .then(res => {
                axios
                    .get('/api/competence')
                    .then(res => {
                        let competenceList = [];
                        this.setState({ competences: res.data })
                        this.state.competences.map(competence =>
                            competenceList[competence.competence_id] = competence.competence_id
                        )
                        this.setState({ filteredCompetences: competenceList });

                    })
                    .catch(err => {
                        toast(this.props.info.general.error)
                        console.log(err)

                    })
                this.setState({ application: this.parseApplications(res.data) })

            })
            .catch(err => {
                toast(this.props.info.general.error)
                console.log(err)
            })
    }
    changeApplicationStatus = (status, id) => {
        axios
            .put('/api/application', { status: status, id: id, lastEdited: this.state.timestamp })
            .then(res => {
                console.log(res.status)
                this.showInfo(id, false)
                this.setState({ timestamp: new Date() })
                toast(this.props.info.listApplications.success)
                this.getApplicationsAndCompetences();

            })
            .catch(err => {
                console.log(err.response.data)
                if (err.response.data === APPLICATION_EDITED) {
                    this.showInfo(id, false)
                    this.setState({ timestamp: new Date() })
                    toast(this.props.info.listApplications.editedMessage)
                    this.getApplicationsAndCompetences();
                } else{
                    toast(this.props.info.general.error)
                    console.error(err)
                }
            })
    }
    parseApplications(applications) {
        let listOfApplications = [];
        for (let app of applications) {
            listOfApplications.push(JSON.parse(app));
        }
        return listOfApplications
    }
    renderTable() {
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
                        < tr key={key} className="pressForInfo" >
                            <td key={"name: " + key} className="pressForInfo" >{application.firstName}</td>
                            <td key={"lastName: " + key} > {application.lastName}</td>
                            <td key={"applicationDate: " + key} > {application.dateOfSubmission}</td>
                            <td key={"moreInfo: " + key} > {this.renderFullApplication(application, this.props.info.listApplications.info, true)}</td>
                        </tr>
                    )}
                </tbody>
            </Table >
        )
    }
    // <Application info={this.props.info} application={application} />
    showInfo(id, state) {
        let list = this.state.showUser;
        list[id] = state;
        this.setState({ showUser: list })
        // console.log(this.state.showUser)
    }
    renderFullApplication(application, name, button) {
        return (
            <Fragment>
                <Button variant="primary" className="ml-auto" id={application.id} onClick={() => this.showInfo(application.id, true)}>{name}</Button>
                <Modal
                    centered
                    show={this.state.showUser[application.id]}
                    onHide={() => this.showInfo(application.id, false)}
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
                        <Button variant="secondary" onClick={() => this.showInfo(application.id, false)} className="margin">{this.props.info.listApplications.close}</Button>
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
                    {this.props.info.listApplications.filter}
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
    setCheckbox(competenceID, key) {
        let list = this.state.filteredCompetences;
        list[key] = competenceID;
        this.setState({ filteredCompetences: list });
        // console.log(this.state.filteredCompetences)
    }

    renderSearch() {
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h3>Competences</h3>
                        <Form>
                            <div className="mb-3">
                                {this.state.competences.map((competence, key) =>

                                    <Form.Check
                                        defaultChecked={null !== (this.state.filteredCompetences[key + 1])}
                                        id={key}
                                        label={competence.name}
                                        onChange={() => (null === this.state.filteredCompetences[key + 1]) ? this.setCheckbox(competence.competence_id, key + 1) : this.setCheckbox(null, key + 1)}
                                    />
                                )}
                            </div>
                        </Form>
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
                            isOutsideRange={function noRefCheck() { }}
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
            <div className="marginTop">
                <Access access='1' info={this.props.info.access} />
                {this.renderFilter()}
                {/* {this.renderSearch()} */}
                {this.renderTable()}
            </div >
        );
    };
}
export default ListApplications