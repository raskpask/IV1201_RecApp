import React, { Component, Fragment } from 'react';
import { Col, Row, Table, Nav, Card } from 'react-bootstrap';


import '../../resources/css/application.css';

class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bodyContent: this.renderInfo(),
        }
    }


    renderApplication() {
        return (
            <Fragment>
                <Card className="card">
                    <Card.Header>
                        <Nav variant="pills" >
                            <Nav.Item>
                                <Nav.Link onClick={() => this.setState({ bodyContent: this.renderInfo() })}>Info</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={() => this.setState({ bodyContent: this.renderCompetence() })}>Competence</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={() => this.setState({ bodyContent: this.renderAvailability() })}>Availability</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        {this.state.bodyContent}
                    </Card.Body>
                </Card>
            </Fragment >
        )
    }
    renderAvailability() {
        return (
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>{this.props.info.user[7].availability}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.application.availability.map((application, key) =>
                        <tr>{application.startDate.split('T')[0]} {this.props.info.user[7].to} {application.endDate.split('T')[0]}</tr>
                    )}
                </tbody>
            </Table>
        )
    }
    renderCompetence() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{this.props.info.user[7].competence}</th>
                        <th>{this.props.info.user[7].yearsOfExperience}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.application.competence.map((application, key) =>
                        <tr>
                            <td> {application.name}</td>
                            <td> {application.yearsOfExperience}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
    renderInfo() {
        return (
            <Fragment>
                <Row>
                    <Col md='4'>
                        {this.props.info.user[7].firstName}{this.props.application.firstName}
                    </Col>
                    <Col md='3'>
                        {this.props.info.user[7].lastName}{this.props.application.lastName}
                    </Col>
                    <Col md='5 '>
                        {this.props.info.user[7].dateOfBirth}{this.props.application.dateOfBirth}
                    </Col>
                </Row>
                <Row>
                    <Col md='5'>
                        {this.props.info.user[7].dateOfSubmission}{this.props.application.dateOfSubmission.split('T')[0]}
                    </Col>
                    <Col md='3'>
                        {this.props.info.user[7].lastEdited}{this.props.application.lastEdited.split('T')[0]}
                    </Col>
                    <Col md='4'>
                        {this.props.info.user[7].status}{this.getStatus(this.props.application.status)}
                    </Col>
                </Row>
            </Fragment>
        )
    }
    getStatus(status) {
        if (status === 0) {
            return (
                this.props.info.user[8].status0
            )
        } else if (status === 1) {
            return (
                this.props.info.user[8].status1
            )
        } else if (status === 2) {
            return (
                this.props.info.user[8].status2
            )
        } else {
            return (
                this.props.info.user[8].statuselse
            )
        }
    }
    render() {
        return (
            <Fragment>
                {this.renderApplication()}
            </Fragment >
        );
    };
}
export default Application