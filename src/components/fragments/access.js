import React, { Component, Fragment } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import redirect from '../../model/redirect';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

class Access extends Component {
    constructor(props) {
        super(props);
        this.state = {
            access: ""
        }
    }
    componentDidMount() {
        if (!redirect.checkAccess(this.props.access)) {
            this.notify()
        }
    }
    notify = () => {
        toast(this.props.info.message);
    }

    render() {
        return (
            <Fragment>
                {redirect.checkAccess(this.props.access)? "" : <Redirect to='/' />}
            </Fragment >
        );
    };
}
export default Access