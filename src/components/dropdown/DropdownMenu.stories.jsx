import React from 'react';
import { action } from '@storybook/addon-actions';

import {
  Padded,
  DarkBg,
} from '../../stories/helpers';

import DropdownMenu from './DropdownMenu';

export default {
  title: 'Structure | DropdownMenu',
  components: [DropdownMenu],
};

const menuItems = [
  { label: 'One', onClick: action('Menu Item One Clicked') },
  { label: 'Two', onClick: action('Menu Item Two Clicked') },
  { label: 'Three', onClick: action('Menu Item Three Clicked') },
];

export const BasicDropdownMenu = () => (
  <Padded width="400px">
    <DropdownMenu menuItems={menuItems} />
  </Padded>
);

export const SelectDropdownMenu = () => (
  <Padded width="400px">
    <DropdownMenu select menuItems={menuItems} />
  </Padded>
);

export const NarrowDropdownMenu = () => (
  <Padded width="400px">
    <DropdownMenu select narrow menuItems={menuItems} />
  </Padded>
);

export const MinimalDropdownMenu = () => (
  <DarkBg>
    <Padded width="400px">
      <DropdownMenu select minimal menuItems={menuItems} />
    </Padded>
  </DarkBg>
);
