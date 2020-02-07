import React, { Component } from 'react';
import './resources/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import {  ToastContainer  } from 'react-toastify';

import Header from './components/header';
import Home from './components/home';
import Register from './components/register';
import User from './components/user';
import Apply from './components/apply';
import ListApplications from './components/listApplications';
import Eng from './resources/content/eng';
import Swe from './resources/content/swe';

import './resources/css/register.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eng: Eng.getLanguage(),
            swe: Swe.getLanguage()
        }
    }

    chooseLanguage() {
        if (document.cookie.split('lang=')[1] === 'swe') {
            return this.state.swe
        } else {
            return this.state.eng
        }
    }
    render() {
        return (
            <div className="App" >
                <ToastContainer />
                <Header info={this.chooseLanguage()} app={this} />
                <BrowserRouter>
                    <Route exact path="/"
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