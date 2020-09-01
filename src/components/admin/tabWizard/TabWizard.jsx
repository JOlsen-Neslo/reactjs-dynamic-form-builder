/**
 * @module TabWizard Component
 * @description
 * Presentational component to TabWizardContainer.
 * Receives tabs to display and wraps provided content in a page.
 * The expected `children` is the respective Form Container for the active tab.
 */
import React from 'react';
import {
  array,
  arrayOf,
  func,
  node,
  number,
  object,
  oneOfType,
} from 'prop-types';

import Page from '../page/Page';
import Tabs from '../../tabs/Tabs';
import Header from '../header/Header';

const renderSubTabs = (tab, activeSubTab, onChangeSubTab) => {
  if (!tab.hasOwnProperty('subtabs')) {
    return;
  }

  return (
    <Tabs
      items={tab.subtabs}
      activeItem={activeSubTab}
      onClickItem={onChangeSubTab}
      checkbox
    />
  );
};

const TabWizard = ({
  pageAction, title, user, tabs, activeTab, activeSubTab, onChangeTab, onChangeSubTab, onNearPageBottom, onLogout, children,
}) => (
  <>
    <Header user={user} onLogout={onLogout} />
    <Page title={title} action={pageAction} onNearPageBottom={onNearPageBottom}>
      <Tabs
        items={tabs}
        activeItem={activeTab}
        onClickItem={onChangeTab}
      />

      { renderSubTabs(tabs[activeTab], activeSubTab, onChangeSubTab) }

      { children }
    </Page>
  </>
);

TabWizard.propTypes = {
  user: object.isRequired,
  tabs: array.isRequired,
  activeTab: number.isRequired,
  onChangeTab: func.isRequired,
  children: oneOfType([arrayOf(node), node]),
};

export default TabWizard;
