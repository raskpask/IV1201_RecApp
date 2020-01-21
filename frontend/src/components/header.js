import React, { Component } from 'react';
import { Navbar, FormControl, Form, Button } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand style={{padding: '0'}}href="#home">
                        <img
                            src={require("../resources/img/KTH_logo.jpg")}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="KTH logo"
                        />{' '}
                        Recruitment App
                    </Navbar.Brand>
                    <Form inline className="ml-auto">
                        <FormControl type="Username" placeholder="Username" className=" mr-sm-2" />
                        <FormControl type="Password" placeholder="Password" className=" mr-sm-2" />
                        <Button type="submit">Login</Button>
                    </Form>
                </Navbar>
            </div>
        );
    };
}
export default Header