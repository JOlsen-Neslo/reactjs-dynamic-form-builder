import React from 'react';
import { connect } from 'react-redux';
import {
  clearAuthError,
  requestRegister,
} from '../../../actions/auth.actions';

import Registration from '../../../components/auth/registration/Registration';

const RegistrationContainer = ({ dispatch, auth, history }) => {
  const handleRequest = ({ fullName, email, country }) => dispatch(requestRegister(fullName, email, country));
  const handleReturnToLogin = () => history.push('/');

  return (
    <Registration
      onSubmit={handleRequest}
      onReturnToLogin={handleReturnToLogin}
      success={auth.accessToken !== null}
      failure={auth.authFailure}
      onClearAuthErrors={() => dispatch(clearAuthError())}
    />
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(RegistrationContainer);
