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
                    register: "Register",
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
                header: {
                    home: "Home",
                    applications: "Applications",
                    apply: "Apply",
                    login: "Login",
                    logout: "Logout",
                    language: "Language",
                    register: "Register",
                    username: "Useranme",
                    password: "Password",
                    profile: "Your profile",
                    swe: "SWE",
                    eng: "ENG"

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
            },
            swe: {
                register: {
                    register: "Registrera",
                    username: {
                        name: "Användarnamn",
                        placeholder: "Fyll i användarnamn"
                    },
                    password: {
                        name: "Lösenord",
                        placeholder: "Fyll i lösenord",
                    },
                    email: {
                        name: "Mail",
                        placeholder: "Fyll i mail"
                    },
                    date: {
                        name: "Födelsedag",
                        placeholder: "Fyll i födelsedag"
                    },
                    firstName: {
                        name: "Förnamn",
                        placeholder: "Fyll i förnamn"
                    },
                    lastName: {
                        name: "Efternamn",
                        placeholder: "Fyll i efternamn"
                    }
                },
                header: {
                    home: "Hem",
                    applications: "Ansökningar",
                    apply: "Ansök",
                    login: "Logga in",
                    logout: "Logga ut",
                    language: "Språk",
                    register: "Registrera",
                    username: "Användarnamn",
                    password: "Lösenord",
                    profile: "Min profil",
                    swe: "SWE",
                    eng: "ENG"

                },
                validationError: {
                    emptyField:{
                      message: "Fyll i fältet"
                    },
                    noMatchPassword:{
                      message:"Lösenorden matchar inte"
                    },
                    toLongField:{
                      message:"Fältet är för långt(max antal tecken är MAXNUM)"
                    },
                    toShortField:{
                      message:"Fältet är för kort(minsta antal tecken är MINNUM)"
                    },
                    notValidField:{
                      message:"Fyll i korrekt FIELD"
                    },
                    invalidCharacters:{
                      message:"FIELD innehåller felaktiga tecken"
                    },
                    notUnicode:{
                      message:"Använda endast Unicode tecken"
                    }
                },
                listApplications: {
                    firstName: "Förnamn",
                    lastName: "Efternamn",
                    applicationDate: "Ansökningsdatum",
                    moreInfo: "Ansöknignsinfo",
                    info: "Information",
                    competences: "Kompetenser",
                    applicationPeriod: "Ansökinginsperiod",
                    from: "Från: ",
                    to: "Till: ",
                    availability: "Tillgänglighet",
                    name: "Namn",
                    accept: "Acceptera",
                    reject: "Avböj",
                    close: "Stäng",
                    application: "Ansökan"
                     
                },
                apply: {
                    buttonCompetences: "Kompetens:",
                    buttonDefaultValue: "Välj en kompetens",
                    buttonAddCompetence: "Lägg till kompetens",
                    textYearsOfExperience: "År av erfarnehet: ",
                    availabilityButton: "Lägg till tillgänglighet",
                    sumbitApplication: "Skicka ansökan",
                    tableCompetence: [
                        "Kompetens",
                        "År av erfarenhet"
                    ],
                    tableAvailability: [
                        "Tillgänglighet",
                        "Start datum",
                        "Slut datum",
                        "Period "
                    ],
                },

                user: [
                    {
                        name: "Användarnamn: ",
                        placeholder: "Fyll i användarnamn"
                    },
                    {
                        name: "Lösenord: ",
                        placeholder: "Fyll i lösenord",
                    },
                    {
                        name: "Mail: ",
                        placeholder: "Fyll i mail"
                    },
                    {
                        name: "Födelsedag: ",
                        placeholder: "Fyll i födelsedag"
                    },
                    {
                        name: "Förnamn: ",
                        placeholder: "Fyll i förnamn"
                    },
                    {
                        name: "Efternamn: ",
                        placeholder: "Fyll i efternamn"
                    },
                    {
                        name: "Välkommen "
                    },
                    {
                        availability: "Tillgänglighet",
                        competence: "Kompetens",
                        yearsOfExperience: "År av erfarenhet",
                        to: " till ",
                        dateOfSubmission: "Ansökningsdatum: ",
                        status: "Status: ",
                        lastEdited: "Senast redigerad:  ",
                        firstName: "Förnamn: ",
                        lastName: "Efternamn: ",
                        dateOfBirth: "Födelsedag: "
                    },
                    {
                        status0: "Ej hanterad",
                        status1: "Accepterad",
                        status2: "Avböjd",
                        statuselse: "Status Laddar/Fel"
                    }
                ]
            }
        }
    }
    chooseLanguage(){
        if(document.cookie.split('lang=')[1] === 'swe'){
            return this.state.swe
        } else {
            return this.state.eng
        }
    }
    render() {
        return (
            <div className="App" >
                <Header info={this.chooseLanguage()} app={this}/>
                <BrowserRouter>
                    <Route exact path="/home"
                        render={(props) => <Home info={this.chooseLanguage()} />}
                    />
                    <Route exact path="/listApplications"
                        render={(props) => <ListApplications info={this.chooseLanguage()} />}
                    />
                    <Route exact path="/apply"
                        render={(props) => <Apply info={this.chooseLanguage()} />}
                    />
                    <Route exact path="/register"
                        render={(props) => <Register info={this.chooseLanguage()} />}
                    />
                    <Route exact path="/user"
                        render={(props) => <User info={this.chooseLanguage()} />}
                    />
                </BrowserRouter>
            </div>
        );
    };
}
export default App