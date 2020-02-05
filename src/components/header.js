import React, { Component } from 'react';
import { Navbar, FormControl, Form, Button, Nav, NavDropdown } from 'react-bootstrap';

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
    componentDidMount() {
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
        } else if (privilegeLevel === '2') {
            this.setState({ typeOfUser: this.renderBrandLogin() })
        } else {
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
                    <Nav.Link href="/home">{this.props.info.header.home}</Nav.Link>
                    <Nav.Link href="/register">{this.props.info.header.register}</Nav.Link>
                </Nav>
            </React.Fragment>
        )
    }
    renderBrandLogin() {
        return (
            <React.Fragment>
                <Navbar.Brand>Recruitment app</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/home">{this.props.info.header.home}</Nav.Link>
                    <Nav.Link href="/apply">{this.props.info.header.apply}</Nav.Link>
                </Nav>
            </React.Fragment>
        )
    }
    renderBrandLoginRecruiter() {
        return (
            <React.Fragment>
                <Navbar.Brand>Recruitment app</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/home">{this.props.info.header.home}</Nav.Link>
                    <Nav.Link href="/listApplications">{this.props.info.header.applications}</Nav.Link>
                </Nav>
            </React.Fragment>
        )
    }
    renderLogin() {
        return (
            <Nav>
                <Form inline className="ml-auto">
                    <FormControl
                        type="Username"
                        placeholder={this.props.info.header.username}
                        onChange={event => this.setState({ username: event.target.value })}
                        className=" mr-sm-2" />
                    <FormControl
                        type="Password"
                        placeholder={this.props.info.header.password}
                        onChange={event => this.setState({ password: event.target.value })}
                        className=" mr-sm-2" />
                    <Button onClick={() => this.login()} variant="primary">{this.props.info.header.login}</Button>
                </Form>
                {this.renderlanguage()}
            </Nav>
        )
    }
    renderUser() {
        return (
            <Nav className="ml-auto">
                <Nav.Link className="userText" href="/user"> {this.props.info.header.profile}</Nav.Link>
                <Nav.Link onClick={() => this.logout()}>{this.props.info.header.logout}</Nav.Link>
                {this.renderlanguage()}
            </Nav>
        )
    }
    renderlanguage() {
        return (
            <NavDropdown title={this.props.info.header.language} id="basic-nav-dropdown" >
                <NavDropdown.Item >{this.props.info.header.swe}</NavDropdown.Item>
                <NavDropdown.Item >{this.props.info.header.eng}</NavDropdown.Item>
            </NavDropdown>
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