import React, { Component } from 'react';
import { Navbar, FormControl, Form, Button, Nav } from 'react-bootstrap';

import axios from 'axios';

import '../resources/css/header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "",
                password: "",
            },
            submitted: false,
            isloggedIn: false 
        }
    }
    login = async () => {
        try {
            const credentials = {
                username: this.state.username,
                password: this.state.password
            }
            const response = await axios.post('/api/login', credentials)
            if(response.status === 200){
                this.setState({ isloggedIn: true })
                this.forceUpdate()
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    logout() {
        this.setState({ isloggedIn: false })
        this.forceUpdate()
    }
    isLoggedIn() {
        console.log(document.cookie)
        // token = document.cookie.split('authorization=')[1]
        if (!document.cookie) {
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
                <Navbar.Link className="userText" href="/home"> Hello user</Navbar.Link>
                <Nav.Link onClick={() => this.logout()} href="/home">Logout</Nav.Link>
            </Nav>
        )
    }
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    {this.renderBrand()}
                    {this.state.isloggedIn ? this.renderUser() : this.renderLogin()}
                </Navbar>
            </div>
        );
    };
}
export default Header