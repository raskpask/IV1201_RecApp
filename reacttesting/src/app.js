import React, { Component } from 'react';
import './resources/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header';
import Home from './components/home';
import Register from './components/register';
import User from './components/user';

import './resources/css/register.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eng: {
                register: [
                    {
                        name: "Username",
                        placeholder: "Enter username"
                    },
                    {
                        name: "Password",
                        placeholder: "Enter Password",
                    },
                    {
                        name: "Email",
                        placeholder: "Enter Email"
                    },
                    {
                        name: "Date of birth",
                        placeholder: "Enter date of birth"
                    },
                    {
                        name: "First Name",
                        placeholder: "Enter first name"
                    },
                    {
                        name: "Last Name",
                        placeholder: "Enter last name"
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
                    <Route exact path="/user"
                        render={(props) => <User info={this.state.eng} />}
                    />
                    <Route exact path="/home"
                        render={(props) => <Home info={this.state.eng} />}
                    />
                    <Route exact path="/register"
                        render={(props) => <Register info={this.state.eng} />}
                    />
                </BrowserRouter>
            </div>
        );
    };
}
export default App