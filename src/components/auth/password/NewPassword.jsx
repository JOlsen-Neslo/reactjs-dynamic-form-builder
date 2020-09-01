import React, {
    Component,
    createRef
} from 'react';
import {
    bool,
    func,
    oneOf,
    string
} from 'prop-types';

import { isNull } from '../../../tools/helpers';

import FormRow, { FormRowMessage } from '../../form/formRow/FormRow';
import PasswordInput from '../../input/PasswordInput';
import Button from '../../button/Button';
import AuthWrapper from '../AuthWrapper';

const failureMessage = (message) => <><strong>Oops!</strong> { message }</>;

class NewPassword extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            passwordValid: false,
            confirmPasswordValid: false,
            requested: false,
        };
        
        this.passwordEl = createRef();
        this.confirmPasswordEl = createRef();
    }
    
    componentDidUpdate() {
        // when there is a failure, reset loginRequested to allow future requests
        if (this.state.requested && this.props.error) {
            this.setState({ requested: false });
        }
    }
    
    handleSubmit = () => {
        if (!this.state.requested) {
            this.setState({ requested: true });
            
            this.props.onClearAuthErrors();
            
            this.props.onSubmit({
                password: this.passwordEl.current.value,
                confirmPassword: this.confirmPasswordEl.current.value
            });
        }
    }
    
    get resultMessage() {
        const { error, errorMsg } = this.props;
        
        return error ? failureMessage(errorMsg) : null;
    }
    
    renderMessage() {
        const message = this.resultMessage;
        
        return (
            <FormRow narrow={ isNull(message) }>
                <FormRowMessage>
                    <p className='typo-large-title'>{ message }</p>
                </FormRowMessage>
            </FormRow>
        );
    }
    
    renderInputs() {
        const { error } = this.props;
        
        return <>
            <FormRow>
                <PasswordInput
                    minimal
                    name='password'
                    placeholder='new password'
                    type='password'
                    inputRef={ this.passwordEl }
                    onChange={ (e) => this.setState({ passwordValid: e.currentTarget.value !== '' }) }
                    error={ error }
                />
            </FormRow>
            <FormRow>
                <PasswordInput
                    minimal
                    name='confirm-password'
                    placeholder='confirm password'
                    type='password'
                    inputRef={ this.confirmPasswordEl }
                    onChange={ (e) => this.setState({ confirmPasswordValid: e.currentTarget.value !== '' }) }
                    error={ error }
                />
            </FormRow>
        </>;
    }
    
    renderSubmit() {
        const { passwordValid, confirmPasswordValid, requested } = this.state;
        const { passwordContext } = this.props;
        
        return (
            <FormRow>
                <Button
                    large
                    label={ `${ passwordContext } Password` }
                    disabled={ !passwordValid || !confirmPasswordValid }
                    onClick={ this.handleSubmit }
                    loading={ requested }
                />
            </FormRow>
        );
        
    }
    
    render() {
        const { passwordContext } = this.props;
        const message = this.resultMessage;
        
        return (
            <AuthWrapper>
                <FormRow styles={ { minHeight: '105px' } } narrow={ isNull(message) }>
                    <FormRowMessage>
                        <p className='typo-title'>{ message || `${ passwordContext } your password` }</p>
                    </FormRowMessage>
                </FormRow>
                { this.renderInputs() }
                <FormRow scaffold>
                    <a href='/help'>Help?</a>
                </FormRow>
                { this.renderSubmit() }
            </AuthWrapper>
        );
    }
}


NewPassword.defaultProps = {
    passwordContext: 'Create',
    error: false,
    errorMsg: undefined,
};

NewPassword.propTypes = {
    passwordContext: oneOf(['Create', 'Reset']),
    error: bool,
    errorMsg: string,
    onSubmit: func.isRequired
};

export default NewPassword;
