import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

class TestRequest extends Component {
    state={
        response: "before"
    }

    sendRequest = async () => {
        try {
             const response = await axios.get('/test');
             this.setState({response: response.data});
            
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div>
                <Button onClick={() => this.sendRequest()} variant="outline-primary">SendTestRequest</Button>
                <h1>{this.state.response}</h1>
            </div>
        );
    };
}
export default TestRequest