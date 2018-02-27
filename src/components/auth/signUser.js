import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

export default (adverb) => {

    class SignUser extends Component {

        componentWillMount() {
            if (this.props.authenticated) {
                this.props.history.push('/feature');
            }
        }

        handleFormValues (email, password) {
            const adverb = this.props.adverb;
            const history = this.props.history;
            this.props.signUser(
                {
                    email,
                    password,
                    adverb,
                    history
                }
            );
        }

        renderPasswordFields(adverb) {
            const emailFields = [];
            // let error = this.props.password.error || null;
            for (let i = 0; i < (adverb === 'up' ? 2 : 1 ); i++) {

                let label = 'Password';
                let name = 'password';
                if (i === 1) {
                    label = 'Verify Password';
                    name = 'verifiedPassword';
                    // error = this.props.verifiedPassword.error;
                }

                emailFields.push(
                    <Field
                        key={i}
                        name={name}
                        component={this.props.renderField}
                        label={label}
                        type="password"
                    />
                );
            }
            return emailFields;
        }

        render() {
            const {
                adverb,
                errorMessageFromState,
                renderField,
                renderErrorAfterFormSubmit,
                handleSubmit,
                invalid,
                pristine,
                // reset,
                submitting
            } = this.props;

            const errorMessageAfterFormSubmit = (errorMessageFromState) ?
                renderErrorAfterFormSubmit(this.props.errorMessageFromState) :
                '';
            const buttonText = 'Sign' + adverb;

            return (
                <form onSubmit={
                    handleSubmit(
                        ({email, password}) => {
                            this.handleFormValues(email, password);
                        }
                    )
                }>
                    <Field name="email" component={renderField} label="Email" />
                    {this.renderPasswordFields(adverb)}
                    {errorMessageAfterFormSubmit}
                    <button type="submit" className="btn btn-primary" action="submit" disabled={invalid || submitting || pristine}>
                        {buttonText}
                    </button>
                </form>
            );
        }

    }

    // See: https://redux-form.com/6.0.2/examples/syncvalidation/
    const validate = adverb === 'up' ?
        (formProps) => {
            const {
                email,
                password,
                verifiedPassword
            } = formProps;

            const errors = {};

            if (!email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                errors.email = 'This email address is not valid.';
            }

            if (!password) {
                errors.password = 'Please provide a password.';
            }

            if (
                password !== verifiedPassword
            ) {
                errors.verifiedPassword = 'Please make sure your passwords match.';
            }
            return errors;
        } :
            null;

    const renderField = ({ input, label, type, meta: { touched, error } }) => {

        const errorContent = <span className="error">{error}</span>;
        let errorMessage = touched && error && errorContent; // 'touched' === 'onBlur' event.

        return (
            <fieldset className="form-group">
                <div>
                    <input {...input} placeholder={label} type={type} className="form-control" />
                    {errorMessage}
                </div>
            </fieldset>
        );
    };

    const renderErrorAfterFormSubmit = (errorMessageFromState) => {
        return (
            <div className="alert alert-danger">
                <strong>Oops!</strong> {errorMessageFromState}
            </div>
        );
    };

    function mapStateToProps(state) {
        return {
            adverb: adverb,
            authenticated: state.auth.authenticated,
            errorMessageFromState: state.auth.error,
            renderField,
            renderErrorAfterFormSubmit
        };
    }

    return reduxForm(
        {
            form: adverb, // no need to add fields array in this version of ReduxForm
            validate
        }
    )(
        connect(
            mapStateToProps,
            actions
        )(
            SignUser
        )
    );
};

