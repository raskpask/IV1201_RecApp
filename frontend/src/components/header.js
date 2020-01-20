import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div>
                <h1>Hello world!</h1>
                <h2>{this.props.text}</h2>
            </div>
        );
    };
}
export default Header