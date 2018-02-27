import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {

    handleFormValues = ({email, password}) => {
        this.props.signinUser({ email, password });
    };

    componentWillMount() {
         if (!this.props.authenticated) {
            this.props.history.push('/');
        }
    }

    renderInput({ label, ...args }) {
        return (
            <fieldset className="form-group">
                <label>
                {label}:
                </label>
                <input {...args.input} type="text" className="form-control" />
            </fieldset>
        );
    }

    renderAlert(errorMessage) {
        return (
            <div className="alert alert-danger">
                <strong>Oops!</strong> {errorMessage}
            </div>
        );
    }

    render() {
        const { handleSubmit } = this.props;
        const errorMessage = (this.props.errorMessage) ?
                this.renderAlert(this.props.errorMessage) :
                '';
        return (
            <form onSubmit={handleSubmit(this.handleFormValues)}>
                <Field name="email" component={this.renderInput} label="Email" />
                <Field name="password" component={this.renderInput} label="Password" type="password"/>
                {errorMessage}
                <button className="btn btn-primary" action="submit">
                    Sign in
                </button>
            </form>
        );
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        errorMessage: state.auth.error
    };
}

export default reduxForm(
    {
        form: 'signin', // no need to add fields array in this version of ReduxForm
    }
)(
    connect(
        mapStateToProps,
        actions
    )(
        Signin
    )
);
