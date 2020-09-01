import React from 'react';
// Sidebar menu item icons
/// alternate import syntax to bring in SVG as components
import { ReactComponent as IconControls } from '../../images/icon-controls.svg';
import { ReactComponent as IconBoard } from '../../images/icon-board.svg';
import { ReactComponent as IconFile } from '../../images/icon-file.svg';
import { ReactComponent as IconExit } from '../../images/icon-exit.svg';
import { ReactComponent as IconCommunity } from '../../images/icon-community.svg';
// Home menu images
import imageActionRulesSrc from '../../images/image-action-rules.svg';
import imageCompanyProfileSrc from '../../images/image-company-profile.svg';
import imageDebtProviderSrc from '../../images/image-debt-provider.svg';
import imageMyGroupsSrc from '../../images/image-mygroups.svg';
import imageMyUsersSrc from '../../images/image-myusers.svg';
import imageOperationalProfileSrc from '../../images/image-operational-profile.svg';

/**
 * Map of menu item names (set on the Route definition as 'name' prop)
 *  and their associated labels
 */
export const sidebarMenuLabels = {
  home: 'Home',
  companyProfile: 'Company Profile',
  operationalProfile: 'Operational Profile',
  logout: 'Logout',
  agent: 'Single Debt View',
};

export const sidebarMenuIcons = {
  home: <IconControls />,
  companyProfile: <IconFile />,
  operationalProfile: <IconBoard />,
  logout: <IconExit />,
  agent: <IconCommunity />,
};

/**
 * Helper to build each home menu item's title image
 *
 * @param {string} title - name/title for the menu item
 * @param {string} imageSrc - url of the image to display with the title
 */
const getHomeMenuIcon = (title, imageSrc) => (
  <>
    <img src={imageSrc} alt={title} />
    <p>{ title }</p>
  </>
);

/// Gets fed to through to the home screen for display
export const homeMenuItems = [
  {
    help: 'Easily set-up your company profile. Edit and adjust when ever you need to.',
    icon: getHomeMenuIcon('Company Profile', imageCompanyProfileSrc),
    label: 'Create',
  },
  {
    help: 'Run Accolade as smooth as possible. Follow the easy set-up and grow your business.',
    icon: getHomeMenuIcon('Operational Profile', imageOperationalProfileSrc),
    label: 'Create',
    path: '/admin/operational-profile',
  },
  {
    help: 'Set up your debt providers and start collecting!',
    icon: getHomeMenuIcon('My Debt Providers', imageDebtProviderSrc),
    label: 'Create',
  },
  {
    help: 'Upload your users easily.',
    icon: getHomeMenuIcon('My Users', imageMyUsersSrc),
    label: 'Create',
  },
  {
    help: 'View and custom your Action Rule List and give your users the right access.',
    icon: getHomeMenuIcon('Action Rule list', imageActionRulesSrc),
    label: 'View',
  },
  {
    help: 'Create groups of users with the right action rules and see how smooth operations can run.',
    icon: getHomeMenuIcon('My Groups', imageMyGroupsSrc),
    label: 'Create',
  },
];
