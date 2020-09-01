import React from 'react';
import { action } from '@storybook/addon-actions';
import { Padded } from '../../../stories/helpers.js';
import SnackAlert, {
  SNACK_SUCCESS,
  SNACK_WARNING,
  SNACK_INFO,
  SNACK_CRITICAL,
} from './SnackAlert';

export default {
  title: 'Snack Alert',
  components: [SnackAlert],
};

export const BasicSnacks = () => (
  <Padded>
    <SnackAlert
      status={SNACK_SUCCESS}
      title="All good over here!"
      onClose={action('closed!')}
    />
    <br />
    <SnackAlert
      status={SNACK_WARNING}
      title={'Uh oh, you\'d better come check this out!'}
      onClose={action('closed!')}
    />
    <br />
    <SnackAlert
      status={SNACK_INFO}
      title="Oh, by the way, something cool happened, just wanted to let you know!"
      onClose={action('closed!')}
    />
    <br />
    <SnackAlert
      status={SNACK_CRITICAL}
      title="Oh crumbs, pay attention to this!"
      onClose={action('closed!')}
    />
  </Padded>
);
