import React, { Component } from 'react';
import './resources/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

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
            lang: Eng.getLanguage()
        }
    }
    componentDidMount(){
        if(document.cookie.split('lang=').length > 1){
            const lang = document.cookie.split('lang=')[1].split(';')[0]
            this.updateLanguage(lang);
        }
    }
    updateLanguage(lang) {
        if (lang === 'sv-se') {
            this.setState({ lang: Swe.getLanguage() });
        } else if (lang === 'en-us') {
            this.setState({ lang: Eng.getLanguage() });
        }
    }
    render() {
        return (
            <div className="App" >
                <ToastContainer />
                <Header info={this.state.lang} app={this} />
                <BrowserRouter>
                    <Route exact path="/"
                        render={(props) => <Home info={this.state.lang} />}
                    />
                    <Route exact path="/listApplications"
                        render={(props) => <ListApplications info={this.state.lang} />}
                    />
                    <Route exact path="/apply"
                        render={(props) => <Apply info={this.state.lang} />}
                    />
                    <Route exact path="/register"
                        render={(props) => <Register info={this.state.lang} />}
                    />
                    <Route exact path="/user"
                        render={(props) => <User info={this.state.lang} />}
                    />
                </BrowserRouter>
            </div>
        );
    };
}
export default App