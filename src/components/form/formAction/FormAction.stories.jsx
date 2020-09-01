import React from 'react';
import { action } from '@storybook/addon-actions';

import { Padded } from '../../../stories/helpers';

import FormAction from './FormAction';

export default {
  title: 'Form Elements | Form Action',
  components: [FormAction],
};

export const WithLabelAndAction = () => (
  <Padded>
    <FormAction
      actionLabel="Submit something!"
      onClick={action('you submitted something!')}
    />
  </Padded>
);

export const WhenLoading = () => (
  <Padded>
    <FormAction
      actionLabel="Submit something!"
      onClick={action('you submitted something!')}
      loading
    />
  </Padded>
);

export const SecondaryFormAction = () => (
  <Padded>
    <FormAction
      actionLabel="Submit something!"
      onClick={action('you submitted something!')}
      secondary
      message="Do stuff with this button"
    />
  </Padded>
);
