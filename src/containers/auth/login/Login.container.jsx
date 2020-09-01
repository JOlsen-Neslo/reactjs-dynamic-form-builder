/**
 * @module LoginContainer
 * @description
 * Responsible for the data setup and fetching required to display a login
 *  form successfully.
 */
import React from 'react';
import {
  func,
  object,
} from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { clearAuthError } from '../../../actions/auth.actions';

import Login from '../../../components/auth/login/Login';
import { addSystemNotice } from '../../../actions/system.actions';
import { SNACK_INFO } from '../../../components/admin/snackAlert/SnackAlert';
import { setAccessTokenCookie } from '../../../tools/auth';

const LoginContainer = ({ dispatch, auth }) => {
  const history = useHistory();

  const handleRequestAuth = (username, password) => {
    // removed for demo purposes
    // dispatch(requestAuth(username, password, history));
    setAccessTokenCookie('demo');
    dispatch(addSystemNotice('Welcome, Jordan Olsen!', SNACK_INFO));
    history.push('/admin/home');
  };

  return (
    <Login
      onSubmit={handleRequestAuth}
      authFailure={auth.authFailure}
      authSuccess={auth.accessToken !== null}
      onClearAuthErrors={() => dispatch(clearAuthError())}
    />
  );
};

LoginContainer.propTypes = {
  dispatch: func.isRequired,
  auth: object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(LoginContainer);
