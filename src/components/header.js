import React, { Component } from 'react';
import { Navbar, FormControl, Form, Button, Nav, NavDropdown } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { errorCodes } from '../model/dbErrors'
import { toast } from 'react-toastify';


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
            form: {
                invalidLogin: false,
                isLoading: false,
            }
        }
    }
    setLanguage(lang) {
        const cookies = new Cookies();
        cookies.set('lang', lang, { path: '/' });
        this.props.app.updateLanguage(lang)
        window.location.href = "/";
        this.props.app.forceUpdate()
    }
    login = async () => {
        this.setState({
            form: {
                invalidLogin: false,
                isLoading: true
            }
        });
        try {
            const credentials = {
                username: this.state.username,
                password: this.state.password
            }

            const responseLogin = await axios.post('/api/authentication', credentials)
            if (responseLogin.status === 200) {
                window.location.href = "/";
                await axios.get('/api/user');
                this.forceUpdate()
            }

        } catch (error) {
            if (error.response.data === errorCodes.LOGIN_ERROR.code) {
                toast(this.props.info.header.loginError)
                this.setState({
                    form: {
                        invalidLogin: true,
                        isLoading: false
                    }
                });
            } else {
                this.setState({ isLoading: false })
                console.error(error)
                toast(this.props.info.general.error)
            }
        }
    }
    logout = async () => {
        try {
            const response = await axios.delete('/api/authentication')
            if (response.status === 200) {
                window.location.href = "/";
                this.forceUpdate()
            }
        } catch(err){
            console.error(err)
            toast(this.props.info.general.error)
        }
    }
    chooseUserLevel() {
        let privilegeLevel = document.cookie.split('privilegeLevel=')[1];

        if (Boolean(privilegeLevel)) {
            privilegeLevel = privilegeLevel.split(';')[0];
        }
        if (privilegeLevel === '1') {
            return this.renderBrandLoginRecruiter()
        } else if (privilegeLevel === '2') {
            return this.renderBrandLogin()
        } else {
            return this.renderBrand()
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
                <Nav className="mr-auto">
                    <Nav.Link href="/">{this.props.info.header.home}</Nav.Link>
                    <Nav.Link href="/register">{this.props.info.header.register}</Nav.Link>
                </Nav>
            </React.Fragment>
        )
    }
    renderBrandLogin() {
        return (
            <React.Fragment>
                <Nav className="mr-auto">
                    <Nav.Link href="/">{this.props.info.header.home}</Nav.Link>
                    <Nav.Link href="/apply">{this.props.info.header.apply}</Nav.Link>
                </Nav>
            </React.Fragment>
        )
    }
    renderBrandLoginRecruiter() {
        return (
            <React.Fragment>
                <Nav className="mr-auto">
                    <Nav.Link href="/">{this.props.info.header.home}</Nav.Link>
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
                        isInvalid={this.state.form.invalidLogin}
                        placeholder={this.props.info.header.username}
                        onChange={event => this.setState({ username: event.target.value })}
                        className=" mr-sm-2" />

                    <FormControl
                        type="Password"
                        placeholder={this.props.info.header.password}
                        isInvalid={this.state.form.invalidLogin}
                        onChange={event => this.setState({ password: event.target.value })}
                        className=" mr-sm-2" />
                    <Button onClick={() => this.login()} variant="primary" disabled={this.state.form.isLoading}>
                        {this.state.form.isLoading ? this.props.info.general.loading : this.props.info.header.login}
                    </Button>

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
                <NavDropdown.Item onClick={() => this.setLanguage('sv-se')}>{this.props.info.header.swe}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.setLanguage('en-us')}>{this.props.info.header.eng}</NavDropdown.Item>
            </NavDropdown>
        )
    }
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    {this.chooseUserLevel()}
                    {this.isLoggedIn() ? this.renderUser() : this.renderLogin()}
                </Navbar>
            </div>
        );
    };
}
export default Header