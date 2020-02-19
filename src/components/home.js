import React, { Component } from 'react';   

import '../resources/css/register.css';

class Home extends Component {
    

    render() {
        return (
            <div>
                <p> </p>
                <p> </p>
                <p>{this.props.info.home.message}</p>
                <p>{this.props.info.home.tel}</p>
                <p>{this.props.info.home.mail}</p>
            </div >
        );
    };
}
export default Home