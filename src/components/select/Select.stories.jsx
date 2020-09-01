import React from 'react';
import { action } from '@storybook/addon-actions';

import {
  DarkBg,
  Padded,
} from '../../stories/helpers';

import Select from './Select';

export default {
  title: 'Form Elements | Select',
  components: [Select],
};

export const WithMenuItems = () => (
  <Padded width="400px">
    <Select
      menuItems={[
        { label: 'One', value: 'onesy' },
        { label: 'Two', value: 2 },
        { label: 'Three', value: 3 },
        { label: 'Four', value: 4 },
      ]}
      onChange={action('Option changed!')}
    />
  </Padded>
);

export const SmallSelect = () => (
  <Padded width="400px">
    <Select
      small
      menuItems={[
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 },
        { label: 'Three', value: 3 },
        { label: 'Four', value: 4 },
      ]}
      onChange={action('Option changed!')}
    />
  </Padded>
);

export const NarrowSelect = () => (
  <Padded width="400px">
    <Select
      narrow
      menuItems={[
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 },
        { label: 'Three', value: 3 },
        { label: 'Four', value: 4 },
      ]}
      onChange={action('Option changed!')}
    />
  </Padded>
);

export const MinimalSelect = () => (
  <DarkBg>
    <Padded width="400px">
      <Select
        minimal
        menuItems={[
          { label: 'One', value: 1 },
          { label: 'Two', value: 2 },
          { label: 'Three', value: 3 },
          { label: 'Four', value: 4 },
        ]}
        onChange={action('Option changed!')}
      />
    </Padded>
  </DarkBg>
);

export const WithALotOfItems = () => (
  <DarkBg>
    <Padded width="400px">
      <Select
        menuItems={
                    Array(100).fill({}).map((item, i) => ({ label: `Item ${i}`, value: i }))
                }
        onChange={action('Option changed!')}
      />
    </Padded>
  </DarkBg>
);
