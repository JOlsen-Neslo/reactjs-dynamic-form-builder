import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    clearAuthError,
    requestCreatePassword,
    requestForgotPassword,
    requestResetPassword,
    requestValidateEmailConfirmationToken,
    requestValidatePasswordResetToken
} from '../../../actions/auth.actions';

import NewPassword from '../../../components/auth/password/NewPassword';
import AuthTokenErrorMessage from '../../../components/auth/AuthTokenErrorMessage';
import ForgottenPassword from '../../../components/auth/password/ForgottenPassword';

class PasswordContainer extends Component {
    componentDidMount() {
        const { context } = this.props.match.params;
        
        if (context === 'create') {
            this.validateEmailConfirmationToken();
        } else if (context === 'reset') {
            this.validateResetPasswordToken();
        }
    }
    
    /**
     * Validates whether the email confirmation link is valid for the user to be able to create their password
     * when registering.
     */
    validateEmailConfirmationToken() {
        const { dispatch } = this.props;
        const { search } = this.props.location;
        
        const params = new URLSearchParams(search);
        
        const user = params.get('user');
        const token = params.get('token');
        
        dispatch(requestValidateEmailConfirmationToken(user, token));
    }
    
    /**
     * Validates whether the reset password link is valid for the user to be able to reset their password.
     */
    validateResetPasswordToken() {
        const { dispatch } = this.props;
        const { search } = this.props.location;
        
        const params = new URLSearchParams(search);
        
        const user = params.get('user');
        const token = params.get('token');
        
        dispatch(requestValidatePasswordResetToken(user, token));
    }
    
    handleCreatePassword = ({ password, confirmPassword }) => {
        const { dispatch, history } = this.props;
        const { search } = this.props.location;
        
        const params = new URLSearchParams(search);
        const user = params.get('user');
        
        dispatch(requestCreatePassword(user, password, confirmPassword, history));
    };
    
    handleResetPassword = ({ password, confirmPassword }) => {
        const { dispatch, history } = this.props;
        const { search } = this.props.location;
        
        const params = new URLSearchParams(search);
        const user = params.get('user');
        
        dispatch(requestResetPassword(user, password, confirmPassword, history));
    };
    
    handleForgotPassword = (email) => {
        const { dispatch } = this.props;
        
        dispatch(requestForgotPassword(email));
    }
    
    renderTokenError(message) {
        return (
            <AuthTokenErrorMessage
                message={ message }
            />
        );
    }
    
    render() {
        const { context } = this.props.match.params;
        const { auth, dispatch } = this.props;
        
        if (auth.tokenFailure && context === 'create') {
            return this.renderTokenError('The email confirmation link is not valid.');
        } else if (auth.tokenFailure && context === 'reset') {
            return this.renderTokenError('The reset password link is not valid.');
        }
        
        switch (context) {
            case 'forgot':
                return <ForgottenPassword
                    onSubmit={ this.handleForgotPassword }
                    success={ auth.accessToken !== null }
                    error={ auth.errorMsg }
                    onClearAuthErrors={ () => dispatch(clearAuthError()) }
                />;
            case 'reset':
                return <NewPassword
                    passwordContext='Reset'
                    error={ auth.errorMsg != null }
                    errorMsg={ auth.errorMsg }
                    onSubmit={ this.handleResetPassword }
                    onClearAuthErrors={ () => dispatch(clearAuthError()) }
                />;
            default:
                return <NewPassword
                    passwordContext='Create'
                    error={ auth.errorMsg !== null }
                    errorMsg={ auth.errorMsg }
                    onSubmit={ this.handleCreatePassword }
                    onClearAuthErrors={ () => dispatch(clearAuthError()) }
                />;
        }
    }
}

const mapStateToProps = state => ({ auth: state.auth });

export default withRouter(connect(mapStateToProps)(PasswordContainer));
