/**
 * @module DashboardLayout Component
 * @description
 * A layout component for dashboards, i.e. sidebar on the left, with
 *  a scrollable body area.
 */
import React from 'react';
import {
  arrayOf,
  bool,
  element,
  node,
  oneOfType,
} from 'prop-types';

import { getClassNames } from '../../tools/helpers';

import './layout.scss';

const renderSideContent = (sideContent) => sideContent && (
<div className="layout-dashboard__side-content">
  { sideContent }
</div>
);

const DashboardLayout = ({ sideContent, constrained, children }) => (
  <div className={getClassNames('layout-dashboard', { constrained })}>
    { renderSideContent(sideContent) }
    <div className="layout-dashboard__body">
      { children }
    </div>
  </div>
);

DashboardLayout.defaultProps = {
  constrained: false,
  sideContent: undefined,
};

DashboardLayout.propTypes = {
  sideContent: element,
  constrained: bool,
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default DashboardLayout;
