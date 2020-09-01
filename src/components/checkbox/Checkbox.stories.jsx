import React from 'react';
import { action } from '@storybook/addon-actions';

import { Padded } from '../../stories/helpers';

import Checkbox from './Checkbox';

export default {
  title: 'Form Elements | Checkbox',
  components: [Checkbox],
};

export const EmptyState = () => (
  <Padded width="400px">
    <Checkbox name="test-box" onChange={action('you toggled!')} />
  </Padded>
);

export const WithLabel = () => (
  <Padded width="400px">
    <Checkbox
      name="test-box"
      onChange={action('you toggled!')}
      label="Try clicking me, the checkbox will react"
    />
  </Padded>
);

export const ReadOnly = () => (
  <Padded width="400px">
    <Checkbox
      readOnly
      name="test-box"
      onChange={action('you toggled!')}
      label="Try clicking me, nothing will happen"
    />
    <br />
    <Checkbox
      readOnly
      checked
      name="test-box"
      onChange={action('you toggled!')}
      label="Try clicking me, nothing will happen"
    />
  </Padded>
);

export const ContainedCheckbox = () => (
  <Padded width="800px">
    <Checkbox
      name="test-box"
      onChange={action('you toggled!')}
      contained
      label="Picks up text styles from parent"
    />
  </Padded>
);
