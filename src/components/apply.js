import React, { Component, Fragment } from 'react';
import { Dropdown, InputGroup, DropdownButton, FormControl, Button } from 'react-bootstrap';

import axios from 'axios';

import '../resources/css/register.css';
import '../resources/css/user.css';
import '../resources/css/apply.css';

class Apply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfYears: "",
            competence: "",
            competenceID: "",
            addedCompetences: [],
            competences: [],
            user: {
                username: "",
                password: "",
                email: "",
                date: "",
                firstName: "",
                lastName: ""
            },
            submitted: false
        }
    }
    renderNumbers() {
        return (
            <Fragment>
                <Dropdown.Item id='1'>1</Dropdown.Item>
                <Dropdown.Item id='2'>2</Dropdown.Item>
                <Dropdown.Item id='3'>3</Dropdown.Item>
                <Dropdown.Item id='4'>4</Dropdown.Item>
                <Dropdown.Item id='5'>5</Dropdown.Item>
                <Dropdown.Item id='6'>6</Dropdown.Item>
                <Dropdown.Item id='7'>7</Dropdown.Item>
                <Dropdown.Item id='8'>8</Dropdown.Item>
                <Dropdown.Item id='9'>9</Dropdown.Item>
                <Dropdown.Item id='10'>10</Dropdown.Item>
                <Dropdown.Item id='11'>10+</Dropdown.Item>
            </Fragment>
        )
    }
    addCompetence() {
        const newCompetence = { competenceID: this.state.competenceID, numberOfYears: this.state.numberOfYears };
        let list = this.state.addedCompetences;
        list.push(newCompetence);
        this.setState({ addedCompetences: list });
    }
    renderAvailability(){
        return (
            <Fragment>
                
            </Fragment>
        )
    }
    renderCompetences() {
        return (
            <Fragment>
                <InputGroup className="mb-3 addForm">
                    <DropdownButton variant="primary" title={this.props.info.apply[0].buttonCompetences+" "+ this.state.competence} className="paddingRight"
                        onClick={event => this.setState({ competence: event.target.name, competenceID: event.target.id })}>
                        {this.state.competences.map((competence, key) =>
                            <Dropdown.Item key={key} id={Math.round(key / 2)} name={competence}>
                                {isNaN(competence) ? competence : ""}
                            </Dropdown.Item>
                        )}
                    </DropdownButton>
                    <DropdownButton variant="primary" title={this.props.info.apply[0].textYearsOfExperience}
                        onClick={event => this.setState({ numberOfYears: event.target.id })}>
                        {this.renderNumbers()}
                    </DropdownButton>
                    <FormControl className="marginTextBox" aria-describedby="basic-addon1" value={this.state.numberOfYears} 
                        onChange={event => this.setState({ numberOfYears: event.target.value })}
                    />
                    <Button variant="primary" className="paddingLeft"
                        onClick={() => this.addCompetence()}
                    >{this.props.info.apply[0].buttonAddCompetence}</Button>
                </InputGroup>
            </Fragment>
        )
    }
    isNumber() {

    }
    componentDidMount = async () => {
        const competences = await (await axios.get('/api/competence')).data;
        this.setState({ competences: competences, competence: competences[1] })
    }


    render() {
        return (
            <div>
                {this.renderCompetences()}
            </div >
        );
    };
}
export default Apply