/**
 * @module HomeContainer (Admin)
 * @description
 */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';

import { homeMenuItems } from '../admin.helpers';

import withAuthentication from '../../auth/withAuthentication';

import Home from '../../../components/admin/home/Home';

/// Whether to initially display the welcome modal or not
const WELCOME_MODAL_SHOWN = true;

const HomeContainer = ({ user, onLogoutUser }) => {
  const [welcomeModalShown, setWelcomeModalShown] = useState(WELCOME_MODAL_SHOWN);

  return (
    <>
      <Home
        user={user}
        menuItems={homeMenuItems}
        welcomeModalShown={welcomeModalShown}
        onCloseWelcomeModal={() => setWelcomeModalShown(false)}
        onLogout={onLogoutUser}
      />
    </>
  );
};

HomeContainer.propTypes = {
  user: object.isRequired,
};

const mapStateToProps = (state) => ({ user: state.user });

// wrap container in a withAutentication HOC for authentication concerns
export default withRouter(connect(mapStateToProps)(withAuthentication(HomeContainer)));
