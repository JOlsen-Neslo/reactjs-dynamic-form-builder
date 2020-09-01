import React from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';

import FormRow, { FormRowMessage } from '../form/formRow/FormRow';
import Button from '../button/Button';
import AuthWrapper from './AuthWrapper';

const AuthTokenErrorMessage = ({ message }) => {
  const history = useHistory();

  const returnToLogin = () => history.push('/');

  return (
    <AuthWrapper>
      <FormRow styles={{ minHeight: '105px' }}>
        <FormRowMessage>
          <p className="typo-title">
            <strong>Oops!</strong>
            { message }
          </p>
        </FormRowMessage>
      </FormRow>
      <FormRow>
        <Button large label="Return to Login" onClick={returnToLogin} />
      </FormRow>
    </AuthWrapper>
  );
};

AuthTokenErrorMessage.propTypes = {
  message: string.isRequired,
};

export default AuthTokenErrorMessage;
