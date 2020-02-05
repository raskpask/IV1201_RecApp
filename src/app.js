import React, { Component } from 'react';
import './resources/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header';
import Home from './components/home';
import Register from './components/register';
import User from './components/user';
import Apply from './components/apply';
import ListApplications from './components/listApplications';

import './resources/css/register.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eng: {
                register: {
                    username: {
                        name: "Username",
                        placeholder: "Enter username"
                    },
                    password: {
                        name: "Password",
                        placeholder: "Enter Password",
                    },
                    email: {
                        name: "Email",
                        placeholder: "Enter Email"
                    },
                    date: {
                        name: "Date of birth",
                        placeholder: "Enter date of birth"
                    },
                    firstName: {
                        name: "First Name",
                        placeholder: "Enter first name"
                    },
                    lastName: {
                        name: "Last Name",
                        placeholder: "Enter last name"
                    }
                },
                validationError: {
                    emptyField:{
                      message: "Please fill in this field"
                    },
                    noMatchPassword:{
                      message:"Passwords do not match"
                    },
                    toLongField:{
                      message:"FIELD is to long(maximum is MAXNUM characters)"
                    },
                    toShortField:{
                      message:"FIELD is to short(minimum is MINNUM characters)"
                    },
                    notValidField:{
                      message:"Please enter a valid FIELD"
                    },
                    invalidCharacters:{
                      message:"FIELD contains invalid characters"
                    },
                    notUnicode:{
                      message:"Please only use Unicode characters"
                    }
                },
                listApplications: {
                    firstName: "First name",
                    lastName: "Last name",
                    applicationDate: "Application date",
                    moreInfo: "Application info",
                    info: "Info",
                    competences: "Competences",
                    applicationPeriod: "Application period",
                    from: "From: ",
                    to: "To: ",
                    availability: "Availability",
                    name: "Name",
                    accept: "Accept",
                    reject: "Reject",
                    close: "Close",
                    application: "Application"
                     
                },
                apply: {
                    buttonCompetences: "Competence:",
                    buttonDefaultValue: "Pick a competence",
                    buttonAddCompetence: "Add competence",
                    textYearsOfExperience: "Years of experience:",
                    availabilityButton: "Add availibility",
                    sumbitApplication: "Submit application",
                    tableCompetence: [
                        "Competence",
                        "Years of experience"
                    ],
                    tableAvailability: [
                        "Availability",
                        "Start date",
                        "End date",
                        "Period "
                    ],
                },

                user: [
                    {
                        name: "Username: ",
                        placeholder: "Enter username"
                    },
                    {
                        name: "Password: ",
                        placeholder: "Enter Password",
                    },
                    {
                        name: "Email: ",
                        placeholder: "Enter Email"
                    },
                    {
                        name: "Date of birth: ",
                        placeholder: "Enter date of birth"
                    },
                    {
                        name: "First Name: ",
                        placeholder: "Enter first name"
                    },
                    {
                        name: "Last Name: ",
                        placeholder: "Enter last name"
                    },
                    {
                        name: "Welcome "
                    },
                    {
                        availability: "Availability",
                        competence: "Competence",
                        yearsOfExperience: "Years of experience",
                        to: " to ",
                        dateOfSubmission: "Date of submission: ",
                        status: "Status: ",
                        lastEdited: "Last edited:  ",
                        firstName: "First name: ",
                        lastName: "Last name: ",
                        dateOfBirth: "Date of birth: "
                    },
                    {
                        status0: "Unhandled",
                        status1: "Accepted",
                        status2: "Rejected",
                        statuselse: "Status Loading/Error"
                    }
                ]
            }
        }
    }

    render() {
        return (
            <div className="App" >
                <Header />
                <BrowserRouter>
                    <Route exact path="/home"
                        render={(props) => <Home info={this.state.eng} />}
                    />
                    <Route exact path="/listApplications"
                        render={(props) => <ListApplications info={this.state.eng} />}
                    />
                    <Route exact path="/apply"
                        render={(props) => <Apply info={this.state.eng} />}
                    />
                    <Route exact path="/register"
                        render={(props) => <Register info={this.state.eng} />}
                    />
                    <Route exact path="/user"
                        render={(props) => <User info={this.state.eng} />}
                    />
                </BrowserRouter>
            </div>
        );
    };
}
export default App