import React, { Component, Fragment } from 'react';
import { Col, Row, Table, Nav, Card, Container } from 'react-bootstrap';


import '../../resources/css/application.css';

class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bodyContent: this.renderInfo(),
        }
    }
componentDidMount(){
    console.log(this.props)
}

    renderApplication() {
        return (
            <Fragment>
                <Card className="card">
                    <Card.Header className="header">
                        <Nav variant="pills" >
                            <Nav.Item>
                                <Nav.Link onClick={() => this.setState({ bodyContent: this.renderInfo() })}>{this.props.info.user[7].info}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={() => this.setState({ bodyContent: this.renderCompetence() })}>{this.props.info.user[7].competence}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={() => this.setState({ bodyContent: this.renderAvailability() })}>{this.props.info.user[7].availability}</Nav.Link>
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
                        <tr key={key}>{application.startDate.split('T')[0]}{this.props.info.user[7].to}{application.endDate.split('T')[0]}</tr>
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
                        <tr key={key}>
                            <td key={"name: " + key}> {application.name}</td>
                            <td key={"experience: " + key}> {application.yearsOfExperience}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
    renderInfo() {
        return (
            <Container className="textSize">
                <Row>
                    <Col >
                        <span className="boldText">{this.props.info.user[7].firstName}</span><span className="value">{this.props.application.firstName}</span>
                    </Col>
                    <Col >
                        {this.props.info.user[7].lastName}<span className="value">{this.props.application.lastName}</span>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        {this.props.info.user[7].dateOfBirth}<span className="value">{this.props.application.dateOfBirth}</span>
                    </Col>
                    <Col >
                        {this.props.info.user[7].status}<span className="value">{this.getStatus(this.props.application.status)}</span>
                    </Col>

                </Row>
                <Row>
                    <Col >
                        {this.props.info.user[7].dateOfSubmission}<span className="value">{this.props.application.dateOfSubmission.split('T')[0]}</span>
                    </Col>
                    <Col >
                        {this.props.info.user[7].lastEdited}<span className="value">{this.props.application.lastEdited.split('T')[0]}</span>
                    </Col>
                </Row>
            </Container>
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