/**
 * @module OperationalProfileContainer (Admin)
 * @description
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { operationalProfileTabs } from './operationalProfile.helpers';
import withAuthentication from '../../auth/withAuthentication';

import TabWizardContainer from '../TabWizard.container';

class OperationalProfileContainer extends Component {
  render() {
    return (
      <TabWizardContainer
        title="Operational Profile"
        dispatch={this.props.dispatch}
        tabs={operationalProfileTabs}
        user={this.props.user}
        company={this.props.company}
        system={this.props.system}
        onLogout={this.props.onLogoutUser}
      />
    );
  }
}

OperationalProfileContainer = withAuthentication(OperationalProfileContainer);

const mapStateToProps = ({ user, company, system }) => ({ user, company, system });
export default withRouter(connect(mapStateToProps)(OperationalProfileContainer));
