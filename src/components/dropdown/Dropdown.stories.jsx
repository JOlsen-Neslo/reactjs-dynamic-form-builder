import React from 'react';
import { action } from '@storybook/addon-actions';

import { Padded } from '../../stories/helpers';

import Button from '../button/Button';
import Dropdown from './Dropdown';

export default {
  title: 'Structure | Dropdown',
  components: [Dropdown],
};

const menuItems = [
  { label: 'One', onClick: action('Menu Item One Clicked') },
  { label: 'Two', onClick: action('Menu Item Two Clicked') },
  { label: 'Three', onClick: action('Menu Item Three Clicked') },
];

export const DropdownWithMenuItems = () => (
  <Padded width="400px">
    <Dropdown menuItems={menuItems}>
      <Button label="Click to open dropdown" />
    </Dropdown>
  </Padded>
);

export const DropdownWithCustomPlacement = () => (
  <Padded styles={{ display: 'flex', justifyContent: 'space-around' }}>
    <Dropdown menuItems={menuItems} placement="left">
      <Button label="Open left" />
    </Dropdown>
    <Dropdown menuItems={menuItems} placement="top-start">
      <Button label="Open top-start" />
    </Dropdown>
  </Padded>
);
