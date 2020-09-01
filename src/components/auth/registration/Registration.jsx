import React, {
    Component,
    createRef
} from 'react';
import {
    bool,
    func
} from 'prop-types';

import { isNull } from '../../../tools/helpers';

import FormRow, { FormRowMessage } from '../../form/formRow/FormRow';
import Input from '../../input/Input';
import Button from '../../button/Button';
import AuthWrapper from '../AuthWrapper';
import Select from '../../select/Select';

// TODO: replace 'value' with country 'key' from the api
const countries = [
    { label: 'South Africa', value: 'South Africa' },
    { label: 'United States of America', value: 'United-States of America' }
];

const welcomeMessage = <>Register to access Accolade<br/>and see your business grow!</>
const successMessage = <><strong>Thank you!</strong><br/> Please check your email to complete your registration.</>;
const failureMessage = <><strong>Oops!</strong> Something went wrong.</>;

class Registration extends Component {
    
    constructor(props) {
        super(props);
        
        this.fullNameEl = createRef();
        this.emailEl = createRef();
        
        this.state = {
            fullNameValid: false,
            emailValid: false,
            countryValid: false,
            country: '',
            registerRequested: false,
            registerSuccess: false,
        };
    }
    
    componentDidUpdate(prevProps) {
        // reset requested state to allow follow up requests
        if (this.state.registerRequested && this.props.failure) {
            this.setState({ registerRequested: false });
        }
        
        // reset requested state and set register success (hides the form)
        if (this.props.success && !prevProps.success) {
            this.setState({
                registerRequested: false,
                registerSuccess: true,
            });
        }
    }
    
    handleSubmit = () => {
        if (!this.state.registerRequested) {
            this.setState({ registerRequested: true });
            
            this.props.onClearAuthErrors();
            
            this.props.onSubmit({
                fullName: this.fullNameEl.current.value,
                email: this.emailEl.current.value,
                country: this.state.country,
            });
        }
    };
    
    handleCountryChange = (country) => {
        this.setState({
            country,
            countryValid: country !== '' && country !== 'select country',
        });
    };
    
    /** Renders the inputs */
    renderInputs() {
        return <>
            <FormRow>
                <Input
                    minimal
                    name='full-name'
                    placeholder='full name'
                    type='text'
                    inputRef={ this.fullNameEl }
                    onChange={ (e) => this.setState({ fullNameValid: e.currentTarget.value !== '' }) }
                />
            </FormRow>
            <FormRow>
                <Input
                    minimal
                    name='email'
                    placeholder='email'
                    type='email'
                    inputRef={ this.emailEl }
                    onChange={ (e) => this.setState({ emailValid: e.currentTarget.value !== '' }) }
                />
            </FormRow>
            <FormRow>
                <Select
                    minimal
                    placeholder='select country'
                    menuItems={ countries }
                    onChange={ this.handleCountryChange }
                />
            </FormRow>
        </>;
    }
    
    /** Renders the submit button */
    renderSubmit() {
        const { fullNameValid, emailValid, countryValid, registerRequested } = this.state;
        
        return (
            <FormRow>
                <Button
                    large
                    label='Register'
                    onClick={ this.handleSubmit }
                    disabled={ !fullNameValid || !emailValid || !countryValid }
                    loading={ registerRequested }
                />
            </FormRow>
        );
    }
    
    /** Render the full form if we haven't completed a successful registration yet. */
    renderForm() {
        const message = this.resultMessage;
        
        return (
            <>
                <FormRow styles={ { minHeight: '105px' } } narrow={ isNull(message) }>
                    <FormRowMessage>
                        <p className='typo-title'>{ message || welcomeMessage }</p>
                    </FormRowMessage>
                </FormRow>
                { this.renderInputs() }
                < FormRow scaffold>
                    <a href='/help'>Help?</a>
                </FormRow>
                { this.renderSubmit() }
            </>
        );
    }
    
    renderSuccessMessage() {
        const { onReturnToLogin } = this.props;
        
        return (
            <>
                <FormRow styles={ { minHeight: '400px' } }>
                    <FormRowMessage>
                        <p className='typo-title'>{ successMessage }</p>
                    </FormRowMessage>
                </FormRow>
                <FormRow>
                    <Button large label='Return to Login' onClick={ onReturnToLogin }/>
                </FormRow>
            </>
        );
    }
    
    /**
     * Selects the message to display. Success, failure or nothing if no attempt
     *  to login has been made.
     * @returns {string}
     */
    get resultMessage() {
        const { success, failure } = this.props;
        
        return success ? successMessage : (failure ? failureMessage : null);
    }
    
    render() {
        
        return (
            <AuthWrapper>
                { this.state.registerSuccess ? this.renderSuccessMessage() : this.renderForm() }
            </AuthWrapper>
        );
    }
}

Registration.propTypes = {
    onSubmit: func.isRequired,
    success: bool.isRequired,
    failure: bool.isRequired,
};

export default Registration;
