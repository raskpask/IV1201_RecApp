import React, { Component, Fragment } from 'react';
import { Dropdown, InputGroup, DropdownButton, Button, Table, Col, Row, FormControl } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import Moment from 'moment';
import { validateCompitence, validateForm } from '../model/applyValidation';
import { errorCodes } from '../model/dbErrors'
import Access from './fragments/access';
import { toast } from 'react-toastify';

import axios from 'axios';

import '../resources/css/register.css';
import '../resources/css/user.css';
import '../resources/css/apply.css';
import '../resources/css/reactDatesOverrides.css';

class Apply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addedCompetences: [],
            competences: [],
            competence: {
                competenceType: { value: "", competenceID: "", isInvalid: false, message: "", valueHasChanged: false },
                numberOfYears: { value: "", isValid: false, isInvalid: false, message: "", valueHasChanged: false },
            },
            user: {
                username: "",
                password: "",
                email: "",
                date: "",
                firstName: "",
                lastName: ""
            },
            availabilityCounter: 1,
            availability: [],
            availabilityIsInvalid: false,
            availabilityErrorMessage: "",
            form: {
                noCompetences: false,
                noAvailability: false,
                alreadyHasApplication: false,
                message: "",
            },
            startDate: "",
            endDate: "",
            submitted: "",
            isLoading: false,
        }
    }
    resetCompitences = () => {
        this.setState({
            competence: {
                competenceType: { value: this.props.info.apply.buttonDefaultValue, competenceID: "", isInvalid: false, message: "", valueHasChanged: false },
                numberOfYears: { value: "", isValid: false, isInvalid: false, message: "", valueHasChanged: false },
            }
        })
    }
    //Years Of Experience OnChange
    yoeOnChange = (value) => {
        let state = {
            ...this.state, competence:
            {
                ...this.state.competence, numberOfYears:
                    { ...this.state.competence.numberOfYears, "value": value }
            }
        };
        state = validateCompitence("yoe", state, this.props.info.validationError);
        this.setState(state);
    }
    //Competence Type OnChange
    ctOnChange = (name, id) => {
        this.setState({
            competence: {
                ...this.state.competence,
                competenceType: {
                    ...this.state.competence.competenceType,
                    value: name,
                    valueHasChanged: true,
                    isInvalid: false,
                    competenceID: id,
                }
            }
        });
    }
    componentDidMount = async () => {
        try {
            const competences = await (await axios.get('/api/competence')).data;
            this.setState({
                competences: competences, competence: {
                    ...this.state.competence,
                    competenceType: {
                        ...this.state.competence.competenceType,
                        value: this.props.info.apply.buttonDefaultValue
                    }
                }
            })
        } catch (err) {
            toast(this.props.info.general.error)
        }
    }
    errorTag(message) {
        return (
            <div className='errorMessage m-auto'>{message}</div>
        )
    }
    renderErrorMessage(trigger, message) {
        return (
            <Fragment>
                {trigger ? this.errorTag(message) : null}
            </Fragment>
        )
    }
    renderNumbers() {
        return (
            <Fragment>
                <Dropdown.Item id='1'>1</Dropdown.Item>
                <Dropdown.Item id='2'>2</Dropdown.Item>
                <Dropdown.Item id='3'>3</Dropdown.Item>
                <Dropdown.Item id='4'>4</Dropdown.Item>
                <Dropdown.Item id='5'>5</Dropdown.Item>
                <Dropdown.Item id='6'>6</Dropdown.Item>
                <Dropdown.Item id='7'>7</Dropdown.Item>
                <Dropdown.Item id='8'>8</Dropdown.Item>
                <Dropdown.Item id='9'>9</Dropdown.Item>
                <Dropdown.Item id='10'>10</Dropdown.Item>
                <Dropdown.Item id='11'>10+</Dropdown.Item>
            </Fragment>
        )
    }
    addCompetence() {
        const newState = validateCompitence(null, this.state, this.props.info.validationError)
        this.setState(newState);
        if (!newState.competence.competenceType.isInvalid && !newState.competence.numberOfYears.isInvalid) {
            const newCompetence = { competenceName: this.state.competence.competenceType.value, competenceID: this.state.competence.competenceType.competenceID, numberOfYears: this.state.competence.numberOfYears.value };
            let list = this.state.addedCompetences;
            list.push(newCompetence);
            this.setState({ addedCompetences: list });
            delete this.state.competences[newCompetence.competenceID - 1];
            this.resetCompitences();
        }
    }

    addAvailability() {
        if (this.state.startDate === "" || this.state.endDate === "") {
            this.setState({ availabilityIsInvalid: true, availabilityErrorMessage: this.props.info.validationError.availEmpty.message })
        } else {
            const newAvailability = { startDate: Moment(this.state.startDate).format('YYYY-MM-DD'), endDate: Moment(this.state.endDate).format('YYYY-MM-DD'), period: this.state.availabilityCounter };
            let list = this.state.availability;
            const period = this.state.availabilityCounter;
            list.push(newAvailability);
            this.setState({ availability: list, startDate: "", endDate: "", availabilityCounter: period + 1 });
        }
    }
    renderAvailability() {
        return (
            <Fragment>
                <DateRangePicker
                    displayFormat={() => "DD/MM/YYYY"}
                    startDate={this.state.startDate}
                    // startDateId="your_unique_start_date_id"
                    endDate={this.state.endDate}
                    // endDateId="your_unique_end_date_id"
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate, availabilityIsInvalid: false })}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                />
                <Button variant="primary" className="marginLeft"
                    onClick={() => this.addAvailability()}
                >{this.props.info.apply.availabilityButton}</Button>
                {this.renderErrorMessage(this.state.availabilityIsInvalid, this.state.availabilityErrorMessage)}

            </Fragment>
        )
    }
    renderCompetences() {
        return (
            <Fragment>
                <InputGroup className="mb-3 addForm">
                    <div className="paddingRight">
                        <DropdownButton variant="primary" title={this.props.info.apply.buttonCompetences + " " + this.state.competence.competenceType.value}
                        >
                            {this.state.competences.map((competence, key) =>

                                <Dropdown.Item key={key} id={key} name={competence.name}
                                    //We parseInt the key and add one to that it is not zero-indexed.
                                    onClick={event => this.ctOnChange(competence.name, (parseInt(key) + 1))}>
                                    {competence.name}
                                </Dropdown.Item>
                            )}
                        </DropdownButton>
                        {this.renderErrorMessage(this.state.competence.competenceType.isInvalid, this.state.competence.competenceType.message)}
                    </div>
                    <DropdownButton variant="primary" title={this.props.info.apply.textYearsOfExperience}
                        onClick={event => this.yoeOnChange(event.target.id)}>
                        {this.renderNumbers()}
                    </DropdownButton>
                    <div className="marginTextBox">
                        <FormControl aria-describedby="basic-addon1"
                            value={this.state.competence.numberOfYears.value}
                            isInvalid={this.state.competence.numberOfYears.isInvalid}
                            isValid={this.state.competence.numberOfYears.isValid}
                            onChange={event => this.yoeOnChange(event.target.value)}
                        />
                        {this.renderErrorMessage(this.state.competence.numberOfYears.isInvalid, this.state.competence.numberOfYears.message)}
                    </div>
                    <div>
                        <Button variant="primary"
                            onClick={() => this.addCompetence()}
                        >{this.props.info.apply.buttonAddCompetence}</Button>
                    </div>

                </InputGroup>
            </Fragment>
        )
    }
    renderSummary() {
        return (
            <Fragment>
                <Col>
                    <Table striped bordered hover className="tableAvailability">
                        <thead>
                            <tr>
                                <th>{this.props.info.apply.tableCompetence[0]}</th>
                                <th>{this.props.info.apply.tableCompetence[1]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.addedCompetences.map((competence, key) =>
                                <tr>
                                    <td> {competence.competenceName}</td>
                                    <td> {competence.numberOfYears}</td>
                                </tr>
                            )}

                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <Table striped bordered hover className="tableCompetence">
                        <thead>
                            <tr>
                                <th>{this.props.info.apply.tableAvailability[0]}</th>
                                <th>{this.props.info.apply.tableAvailability[1]}</th>
                                <th>{this.props.info.apply.tableAvailability[2]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.availability.map((availability, key) =>
                                <tr>
                                    <td> {this.props.info.apply.tableAvailability[3]}{availability.period}</td>
                                    <td> {availability.startDate}</td>
                                    <td> {availability.endDate}</td>
                                </tr>
                            )}

                        </tbody>
                    </Table>
                </Col>
            </Fragment>
        );
    }
    renderSumbit() {
        return (
            <Fragment>
                <Row>
                    <Button variant="primary" className="m-auto"
                        onClick={() => this.submitApplication()}
                        disabled={this.state.isLoading}
                    >
                        {this.state.isLoading ? this.props.info.general.loading : this.props.info.apply.sumbitApplication}
                    </Button>
                </Row>
                <Row>
                    {this.renderErrorMessage((this.state.form.alreadyHasApplication || this.state.form.noAvailability || this.state.form.noCompetences), this.state.form.message)}
                </Row>

            </Fragment>
        )
    }
    submitApplication = async () => {
        let newState = {
            ...this.state,
            isLoading: true,
            form: {
                noCompetences: false,
                noAvailability: false,
                alreadyHasApplication: false,
                message: "",
            }
        };
        newState = validateForm(newState, this.props.info.validationError);
        if (!newState.form.noCompetences && !newState.form.noAvailability) {
            try {
                this.setState({
                    isLoading: true,
                });
                const application = {
                    competence: newState.addedCompetences,
                    availability: newState.availability,
                }
                const res = await axios.post('/api/application', application);
                if (res.status === 200) {
                    this.setState({ ...newState, isLoading: false, submitted: true });
                };
            } catch (error) {
                if (error.response.data === errorCodes.DUPLICATE_APPLICATION_ERROR.code) {
                    this.setState({
                        isLoading: false,
                        form: {
                            ...this.state.form,
                            alreadyHasApplication: true,
                            message: this.props.info.validationError.alreadyHasApplication.message,
                        }
                    });
                } else if (error.response.data === errorCodes.CREATE_APPLICATION_ERROR.code) {
                    toast(this.props.info.apply.sumbitError)
                    this.setState({ isLoading: false, availability: [] })
                } else {
                    this.setState({ isLoading: false })
                    toast(this.props.info.general.error)
                }
            }
        }
        else {
            this.setState({
                ...newState,
                isLoading: false,
            })
        }
    }
    renderFullApplyPage() {
        return (
            <Fragment>
                <Row>
                    {this.renderCompetences()}
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                        {this.renderAvailability()}
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    {this.renderSummary()}
                </Row>
                {this.renderSumbit()}
            </Fragment>
        )
    }
    renderFullOkPage() {
        return (
            <Fragment>
                Application received!
            </Fragment>
        )
    }
    render() {
        return (
            <div>
                <Access access='2' info={this.props.info.access} />
                {this.state.submitted ? this.renderFullOkPage() : this.renderFullApplyPage()}
            </div >
        );
    };
}
export default Apply