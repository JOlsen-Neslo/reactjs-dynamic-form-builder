/**
 * @module AdminContainer
 * @description
 * Container to hold all '/admin' sub-routes. Utilises a `DashboardLayout`, rendering the Sidebar
 *  in the sideContent.
 * Admin `Route` definitions can be passed in as `children`, which will render the active route's
 * Container in the `DashboardLayout` body.
 * This allows us to define routes together in App.js, without spreading them over multiple
 *  components. It also enables the main page content to update independent of the Sidebar.
 * This container is authentication-aware, so any of its sub-routes don't need to be.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { isNull } from '../../tools/helpers';
import {
  sidebarMenuIcons,
  sidebarMenuLabels,
} from './admin.helpers';

import { requestUserProfile } from '../../actions/user.actions';

import withAuthentication from '../auth/withAuthentication';
import Sidebar from '../../components/sidebar/Sidebar';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SnackBar from '../../components/admin/snackAlert/SnackBar';
import { removeSystemNotice } from '../../actions/system.actions';

class AdminContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userProfileRequested: false,
    };
  }

  componentDidMount() {
    this.fetchUserProfile();
  }

  /**
     * Fetches the logged in user's information. Makes use of state to
     *  make sure that multiple requests do not occur.
     */
  fetchUserProfile() {
    const {
      user, accessToken, dispatch, history,
    } = this.props;

    if (!this.state.userProfileRequested) {
      this.setState({ userProfileRequested: true });

      // only request user profile if id is absent
      if (isNull(user.id)) {
        dispatch(requestUserProfile(accessToken, history));
      }
    }
  }

  /**
     * Loops through all children (Route components) and grab their names
     *  and path from props. This is used to build the Sidebar menu items
     *  dynamically, based on what routes exist.
     */
  buildSidebarMenuItems() {
    return this.props.children.map((route) => {
      const { name, path } = route.props;
      return { name, path };
    });
  }

  renderSidebar() {
    return (
      <Sidebar
        menuItems={this.buildSidebarMenuItems()}
        footerItems={[
          { name: 'logout', onClick: this.props.onLogoutUser },
        ]}
        itemLabels={sidebarMenuLabels}
        itemIcons={sidebarMenuIcons}
      />
    );
  }
  
  handleCloseNotice = (noticeId) => {
    this.props.dispatch(removeSystemNotice(noticeId));
  };

  render() {
    const { children, system } = this.props;

    return (
      <>
        <DashboardLayout sideContent={this.renderSidebar()}>
          { children }
        </DashboardLayout>
        <SnackBar notices={system.notices} onCloseNotice={this.handleCloseNotice} />
      </>
    );
  }
}

// wrap container in a HOC for authentication concerns
AdminContainer = withAuthentication(AdminContainer);

AdminContainer.defaultProps = {
  children: [],
};

const mapStateToProps = (state) => ({ auth: state.auth, user: state.user, system: state.system });
export default withRouter(connect(mapStateToProps)(AdminContainer));
