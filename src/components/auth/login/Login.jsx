/**
 * @module Login Component
 * @description
 * Presentational component for `LoginContainer`. Renders the login form, along
 *  with messages describing the result of an authentication request.
 */
import React, { Component, createRef } from 'react';
import { func, bool } from 'prop-types';
import { Link } from 'react-router-dom';

import { isNull, setBodyClass } from '../../../tools/helpers';

import FormRow, { FormRowMessage } from '../../form/formRow/FormRow';
import Input from '../../input/Input';
import PasswordInput from '../../input/PasswordInput';
import Button from '../../button/Button';
import AuthWrapper from '../AuthWrapper';

const welcomeMessage = <>Log in to our app<br/>and see your business grow!</>;
const successMessage = <><strong>Success!</strong> You are logged in.</>;
const failureMessage = <><strong>Oops!</strong> No match found.</>;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameValid: false,
      passwordValid: false,
      loginRequested: false,
    };

    this.usernameEl = createRef();
    this.passwordEl = createRef();
  }
  
  componentDidMount() {
    this.usernameEl.current.focus();
  }

  componentWillUnmount() {
    // restore body background color
    setBodyClass();
  }

  componentDidUpdate() {
    // when there is a failure, reset loginRequested to allow future requests
    if (this.state.loginRequested && this.props.authFailure) {
      this.setState({ loginRequested: false });
    }
  }

  /**
   * Selects the message to display. Success, failure or nothing if no attempt
   *  to login has been made.
   * @returns {string}
   */
  get loginResultMessage() {
    const { authSuccess, authFailure } = this.props;

    if (authSuccess)
      return successMessage;
    else if (authFailure)
      return failureMessage;
    else
      return null;
  }


  /** Submits the login form */
  handleSubmit = () => {
    if (!this.state.loginRequested) {
      this.setState({ loginRequested: true });

      this.props.onClearAuthErrors();

      this.props.onSubmit(
        this.usernameEl.current.value,
        this.passwordEl.current.value
      );
    }
  };

  /** Renders the username and password inputs */
  renderInputs() {
    const { authFailure } = this.props;

    return <>
      <FormRow>
        <Input
          minimal
          name='username'
          placeholder='username'
          inputRef={this.usernameEl}
          onChange={(e) => this.setState({ usernameValid: e.currentTarget.value !== '' })}
          error={authFailure}
        />
      </FormRow>
      <FormRow>
        <PasswordInput
          minimal
          name='password'
          placeholder='password'
          inputRef={this.passwordEl}
          onChange={(e) => this.setState({ passwordValid: e.currentTarget.value !== '' })}
          error={authFailure}
        />
      </FormRow>
    </>;
  }

  /** Renders the submit button */
  renderSubmit() {
    const { usernameValid, passwordValid, loginRequested } = this.state;

    return (
      <FormRow>
        <Button
          large
          label='Log in'
          onClick={this.handleSubmit}
          disabled={!(usernameValid && passwordValid)}
          loading={loginRequested}
        />
      </FormRow>
    );
  }

  render() {
    const message = this.loginResultMessage;

    return (
      <AuthWrapper>
        <FormRow styles={{ minHeight: '105px' }} narrow={isNull(message)}>
          <FormRowMessage>
            <p className='typo-title'>{message || welcomeMessage}</p>
          </FormRowMessage>
        </FormRow>
        {this.renderInputs()}
        <FormRow scaffold>
          <Link to='/password/forgot'>Forgot Password?</Link>
        </FormRow>
        {this.renderSubmit()}
      </AuthWrapper>
    );
  }
}

Login.propTypes = {
  onSubmit: func.isRequired,
  authFailure: bool.isRequired,
  authSuccess: bool.isRequired
};

export default Login;
