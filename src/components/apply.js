import React, { Component, Fragment } from 'react';
import { Dropdown, InputGroup, DropdownButton, Button, Table, Col, Row, FormControl } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import Moment from 'moment';
import { validateCompitence } from '../model/applyValidation';


import Access from './fragments/access';

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
            competence:{
                competenceID: "",
                competenceType: "",
                competenceTypeChosen:false,
                triedToAddCompetence:false,
                numberOfYears: { value: "", isValid: false, isInvalid:false, message:"", valueHasChanged:false },
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
            startDate: "",
            endDate: "",
            submitted: ""
        }
    }
    //Years Of Experience OnChange
    yoeOnChange = (value) =>{
        let state ={...this.state, competence:
            {...this.state.competence,numberOfYears:
                {...this.state.competence.numberOfYears,"value": value}}};
        state = validateCompitence(state, this.props.info.validationError);
        this.setState(state);        
    }
    //Competence Type OnChange
    ctOnChange = (event) =>{
        this.setState({
            competence:{ 
                ...this.state.competence,
                competenceType: event.target.name,
                competenceTypeChosen: true,
                competenceID: event.target.id,
                }
        });
    }
    componentDidMount = async () => {
        const competences = await (await axios.get('/api/competence')).data;

        this.setState({ competences: competences, competence:{ 
            ...this.state.competence,
            competenceType : this.props.info.apply.buttonDefaultValue 
        }})
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
        if(!this.state.competence.numberOfYears.isValid){
            this.yoeOnChange(this.state.competence.numberOfYears.value);
        }else if(!this.state.competence.competenceTypeChosen){
            this.setState({
                ...this.state,
                competence:{
                ...this.state.competence,
                triedToAddCompetence: true,
            }});
        }else{
            const newCompetence = { competenceName: this.state.competence.competenceType, competenceID: this.state.competence.competenceID, numberOfYears: this.state.competence.numberOfYears.value };
            let list = this.state.addedCompetences;
            list.push(newCompetence);
            this.setState({ addedCompetences: list });
        }
    }
    
    addAvailability() {
        const newAvailability = { startDate: Moment(this.state.startDate).format('YYYY-MM-DD'), endDate: Moment(this.state.endDate).format('YYYY-MM-DD'), period: this.state.availabilityCounter };
        let list = this.state.availability;
        const period = this.state.availabilityCounter;
        list.push(newAvailability);
        this.setState({ availability: list, startDate: "", endDate: "", availabilityCounter: period + 1 });
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
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                />
                <Button variant="primary" className="marginLeft"
                    onClick={() => this.addAvailability()}
                >{this.props.info.apply.availabilityButton}</Button>
            </Fragment>
        )
    }

    renderCompetences() {
        return (
            <Fragment>
                <InputGroup className="mb-3 addForm">
                    <div className="paddingRight">
                    <DropdownButton className={(!this.state.competence.competenceTypeChosen&&this.state.competence.triedToAddCompetence) ? "competenceTypeButton": ""} variant= "primary" title={this.props.info.apply.buttonCompetences + " " + this.state.competence.competenceType}
                    >
                        {this.state.competences.map((competence, key) =>
                            <Dropdown.Item key={key} id={key} name={competence.name}
                                onClick={this.ctOnChange}>
                                {competence.name}
                            </Dropdown.Item>
                        )}
                    </DropdownButton>
                    </div>
                    <DropdownButton variant="primary" title={this.props.info.apply.textYearsOfExperience}
                        onClick={event => this.yoeOnChange(event.target.id)}>
                        {this.renderNumbers()}
                    </DropdownButton>
                    <div className="marginTextBox">
                        <FormControl aria-describedby="basic-addon1" 
                            value={this.state.competence.numberOfYears.value}
                            isInvalid = {this.state.competence.numberOfYears.isInvalid}
                            isValid = {this.state.competence.numberOfYears.isValid}
                            onChange={event => this.yoeOnChange(event.target.value)}
                        />
                        <FormControl.Feedback type="invalid">
                            {this.state.competence.numberOfYears.message}
                        </FormControl.Feedback>
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
                <Button variant="primary" className="m-auto"
                    onClick={() => this.submitApplication()}
                >
                    {this.props.info.apply.sumbitApplication}
                </Button>
            </Fragment>
        )
    }
    submitApplication = async () => {
        const application = {
            competence: this.state.addedCompetences,
            availability: this.state.availability,
        }
        const res = await axios.post('/api/application', application);
        if (res.status === 200) {
            this.setState({ submitted: true })
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
                <Row>
                    {this.renderSumbit()}
                </Row>
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
                <Access access='2' info={this.props.info.access}/>
                {this.state.submitted ? this.renderFullOkPage() : this.renderFullApplyPage()}
            </div >
        );
    };
}
export default Apply