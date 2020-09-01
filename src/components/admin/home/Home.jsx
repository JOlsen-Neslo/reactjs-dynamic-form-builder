/**
 * @module Admin Home Component
 * @description
 * The page visible when 'Home' is selected on the Admin Sidebar.
 */
import React from 'react';
import {
  arrayOf,
  bool,
  func,
  object,
} from 'prop-types';

import imageCompanyProfileSrc from '../../../images/image-company-profile-large.svg';

import Card from '../../card/Card';
import Page from '../page/Page';
import Header from '../header/Header';
import Tooltip from '../../tooltip/Tooltip';
import Guide from '../../guide/Guide';
import AdminModal from '../modal/AdminModal';

/**
 * Renders the welcome modal. Image has special positioning,
 *  for it to peek out of the modal container.
 * @param {boolean} modalShown - whether to show or hide the modal
 * @param {function} onCloseModal - a function to change the `modalShown` value
 */
const renderWelcomeModal = (modalShown, onCloseModal) => (
  <AdminModal
    shown={modalShown}
    title="Welcome to our app"
    message={`
      Let’s get you all set-up and ready to perform tasks quick
      and easy. We will take you on a quick tour as you explore
      each section of the Admin Dashboard.`}
    dismissText="Ok, got it! Let’s get started"
    onDismiss={onCloseModal}
  >
    <img src={imageCompanyProfileSrc} alt="Company profile" style={{ marginTop: '-70px' }} />
  </AdminModal>
);

/**
 * Render the home menu items from props.
 * @param {Object[]} menuItems - array of {label:, icon:} pairs to be displayed in a list of cards
 */
const renderHomeMenu = (menuItems) => (
  <div className="card-list-container">
    <div className="card-list">
      {menuItems.map(({
        label, icon, path, help,
      }, index) => (
        <Tooltip key={index} tooltip={<Guide>{help}</Guide>}>
          <Card actionLabel={label} path={path}>
            {icon}
          </Card>
        </Tooltip>
      ))}
    </div>
  </div>
);

/// Only display page contents when the modal is dismissed
const renderPageContents = (welcomeModalShown, menuItems) => !welcomeModalShown && (
  <Page title="Let's get you started">
    {renderHomeMenu(menuItems)}
  </Page>
);

const Home = ({
  user, menuItems, welcomeModalShown, onCloseWelcomeModal, onLogout,
}) => (
  <>
    <Header user={user} onLogout={onLogout} />
    {renderPageContents(welcomeModalShown, menuItems)}
    {renderWelcomeModal(welcomeModalShown, onCloseWelcomeModal)}
  </>
);

Home.defaultProps = {
  menuItems: [],
};

Home.propTypes = {
  user: object.isRequired,
  menuItems: arrayOf(object).isRequired,
  welcomeModalShown: bool.isRequired,
  onCloseWelcomeModal: func.isRequired,
};

export default Home;
