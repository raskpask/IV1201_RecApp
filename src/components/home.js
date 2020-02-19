import React, { Component } from 'react';

import '../resources/css/register.css';

class Home extends Component {

    renderHome() {
        return (
            <div>
                <p>{this.props.info.home.message}</p>
                <p>{this.props.info.home.tel}</p>
                <p>{this.props.info.home.mail}</p>
            </div>
        )
    }
    loggedIn(){
        if (document.cookie.split('authToken=')[1] === undefined) {
            return false
        }
        return true
    }
    render() {
        return (
            <div>
                {this.loggedIn() ? " ": this.renderHome()}
            </div >
        );
    };
}
export default Home