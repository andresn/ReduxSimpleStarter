import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';

class Header extends Component {

    handleSignInOut = () => {
        if (this.props.authenticated) {
            console.log('signing out user!');
            this.props.signoutUser(this.props.history);
        }
    };

    render () {
        const signInOutText = this.props.authenticated ? 'Sign out' : 'Sign in';
        const signInOutTarget = '/signin';

        return (
            <nav className="navbar navbar-light">
                <ul className="nav navbar-nav">
                    <Link to="/" className="navbar-brand">Redux Auth</Link>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to={signInOutTarget}
                            onClick={this.handleSignInOut}
                        >{signInOutText}</Link>
                    </li>
                    {
                        !this.props.authenticated && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/signup"
                                >Sign Up</Link>
                            </li>
                        )
                    }
                </ul>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(
    mapStateToProps,
    actions
)(
    Header
);
