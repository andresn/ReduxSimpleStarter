import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom'

export default (ComposedComponent) => {

    class Authentication extends Component {

        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount() {
             if (!this.props.authenticated) {
                this.props.history.push('/');
            }
        }

        componentUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.props.history.push('/');
            }
        }

        render() {
            return (
                <ComposedComponent />
            );
        }
    }

    function mapStateToProps(state) {
        return {
            authenticated: state.auth.authenticated
        };
    }

    return connect(
        mapStateToProps
    )(
        Authentication
    );
};
