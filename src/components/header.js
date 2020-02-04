import React, { Component } from 'react';
import { Navbar, FormControl, Form, Button, Nav } from 'react-bootstrap';

import axios from 'axios';

import '../resources/css/header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeOfUser: this.renderBrand(),
            user: {
                username: "",
                password: "",
            },
        }
    }
    componentDidMount(){
        this.setLoggedIn()
    }
    login = async () => {
        try {
            const credentials = {
                username: this.state.username,
                password: this.state.password
            }
            const responseLogin = await axios.post('/api/authentication', credentials)
            if (responseLogin.status === 200) {
                await axios.get('/api/user');
                this.setLoggedIn()
            }

        } catch (error) {
            console.log(error)
        }
    }
    logout = async () => {
        const response = await axios.delete('/api/authentication')
        if (response.status === 200) {
            window.location.href = "/";
            this.forceUpdate()
        }
    }
    setLoggedIn() {
        const privilegeLevel = document.cookie.split('privilegeLevel=')[1];
        if (privilegeLevel === '1') {
            this.setState({ typeOfUser: this.renderBrandLoginRecruiter() })
        } else if(privilegeLevel === '2'){
            this.setState({ typeOfUser: this.renderBrandLogin() })
        } else{
            this.setState({ typeOfUser: this.renderBrand() })
        }
    }
    isLoggedIn() {
        if (!document.cookie.split('authToken=')[1]) {
            return false
        }
        return true
    }
    renderBrand() {
        return (
            <React.Fragment>
                <Navbar.Brand>Recruitment app</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
            </React.Fragment>
        )
    }
    renderBrandLogin() {
        return (
            <React.Fragment>
                <Navbar.Brand>Recruitment app</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/apply">Apply</Nav.Link>
                </Nav>
            </React.Fragment>
        )
    }
    renderBrandLoginRecruiter() {
        return (
            <React.Fragment>
                <Navbar.Brand>Recruitment app</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>  
                    <Nav.Link href="/listApplications">Applications</Nav.Link>
                </Nav>
            </React.Fragment>
        )
    }
    renderLogin() {
        return (
            <Form inline className="ml-auto">
                <FormControl
                    type="Username"
                    placeholder="Username"
                    onChange={event => this.setState({ username: event.target.value })}
                    className=" mr-sm-2" />
                <FormControl
                    type="Password"
                    placeholder="Password"
                    onChange={event => this.setState({ password: event.target.value })}
                    className=" mr-sm-2" />
                <Button onClick={() => this.login()} variant="primary">Login</Button>
            </Form>
        )
    }
    renderUser() {
        return (
            <Nav className="ml-auto">
                <Nav.Link className="userText" href="/user"> Your Profile</Nav.Link>
                <Nav.Link onClick={() => this.logout()}>Logout</Nav.Link>
            </Nav>
        )
    }
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    {this.state.typeOfUser}
                    {this.isLoggedIn() ? this.renderUser() : this.renderLogin()}
                </Navbar>
            </div>
        );
    };
}
export default Header