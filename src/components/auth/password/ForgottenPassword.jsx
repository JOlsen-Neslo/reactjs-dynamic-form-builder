/**
 * @module ForgottenPassword Component
 * @description
 * Presentational component for `ForgottenPassword`. Renders the forgotten password form, along
 *  with messages describing the result of an authentication request.
 */
import React, {
    Component,
    createRef
} from 'react';
import {
    bool,
    func,
    string
} from 'prop-types';

import { isNull } from '../../../tools/helpers';

import FormRow, { FormRowMessage } from '../../form/formRow/FormRow';
import Input from '../../input/Input';
import Button from '../../button/Button';
import AuthWrapper from '../AuthWrapper';

const welcomeMessage = <>Forgot password? No sweat!<br/>Enter your email and we will send you the next steps to reset
    your password.</>;
const successMessage = <><strong>Success!</strong> A confirmation email has been sent requesting password reset.</>;
const getErrorMessage = (errorMsg) => <><strong>Oops!</strong> { errorMsg }</>;

class ForgottenPassword extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            emailValid: false,
            requested: false,
        };
        
        this.emailEl = createRef();
    }
    
    componentDidUpdate() {
        // when there is a failure, reset loginRequested to allow future requests
        if (this.state.requested && this.props.error) {
            this.setState({ requested: false });
        }
        
        if (this.state.requested && this.props.success) {
            this.setState({ requested: false });
        }
    }
    
    /** Submits the forgotten password form */
    handleSubmit = () => {
        if (!this.state.requested) {
            this.setState({ requested: true });
            
            this.props.onClearAuthErrors();
            
            this.props.onSubmit(
                this.emailEl.current.value,
            );
        }
    };
    
    
    /**
     * Selects the message to display. Success, failure or nothing if no attempt
     * to execute request has been made.
     * @returns {string}
     */
    get resultMessage() {
        const { success, error } = this.props;
        
        if (success) {
            return successMessage;
        } else if (!isNull(error)) {
            return getErrorMessage(error);
        }
        
        return null;
    }
    
    /** Renders the email input */
    renderInputs() {
        const { error } = this.props;
        
        return <>
            <FormRow>
                <Input
                    minimal
                    name='email'
                    placeholder='email'
                    type='email'
                    inputRef={ this.emailEl }
                    onChange={ (e) => this.setState({ emailValid: e.currentTarget.value !== '' }) }
                    error={ !isNull(error) }
                />
            </FormRow>
        </>;
    }
    
    /** Renders the submit button */
    renderSubmit() {
        const { emailValid, requested } = this.state;
        
        return (
            <FormRow>
                <Button
                    large
                    label='Request Link'
                    disabled={ !emailValid }
                    onClick={ this.handleSubmit }
                    loading={ requested }
                />
            </FormRow>
        );
    }
    
    render() {
        const message = this.resultMessage;
        
        return (
            <AuthWrapper>
                <div className='form__fields'>
                    <br/>
                    <FormRow center narrow={ isNull(message) }>
                        <FormRowMessage>
                            <p className='typo-title'>{ message || welcomeMessage }</p>
                        </FormRowMessage>
                    </FormRow>
                    <br/>
                    <br/>
                    
                    { this.renderInputs() }
                </div>
                { this.renderSubmit() }
            </AuthWrapper>
        );
    }
}

ForgottenPassword.propTypes = {
    onSubmit: func.isRequired,
    success: bool.isRequired,
    error: string,
};

export default ForgottenPassword;
