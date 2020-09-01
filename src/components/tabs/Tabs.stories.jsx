import React from 'react';
import { action } from '@storybook/addon-actions';

import { Padded } from '../../stories/helpers';

import Tabs from './Tabs';

export default {
  title: 'Structure | Tabs',
  components: [Tabs],
};

export const NoActiveItem = () => (
  <Padded>
    <Tabs
      items={[
        { label: 'Tab one' },
        { label: 'Tab two' },
        { label: 'Tab three' },
        { label: 'Tab four' },
        { label: 'Tab five' },
      ]}
      onClickItem={(action('clicked tab item'))}
    />
  </Padded>
);

export const ItemSelected = () => (
  <Padded>
    <Tabs
      items={[
        { label: 'Tab one' },
        { label: 'Tab two' },
        { label: 'Tab three' },
        { label: 'Tab four' },
        { label: 'Tab five' },
      ]}
      activeItem={2}
      onClickItem={(action('clicked tab item'))}
    />
  </Padded>
);

export const CompletedItems = () => (
  <Padded>
    <Tabs
      items={[
        { label: 'Tab one', complete: true },
        { label: 'Tab two' },
        { label: 'Tab three', complete: true },
        { label: 'Tab four' },
        { label: 'Tab five', complete: true },
      ]}
      activeItem={2}
      onClickItem={(action('clicked tab item'))}
    />
  </Padded>
);

export const SmallTabs = () => (
  <Padded styles={{ backgroundColor: '#F8F8F8' }}>
    <Tabs
      items={[
        { label: 'Tab one' },
        { label: 'Tab two' },
        { label: 'Tab three' },
        { label: 'Tab four' },
        { label: 'Tab five' },
      ]}
      small
      activeItem={2}
      onClickItem={(action('clicked tab item'))}
    />
  </Padded>
);

export const SmallTabsWithLinks = () => (
  <Padded styles={{ backgroundColor: '#F8F8F8' }}>
    <Tabs
      items={[
        { label: 'Tab one' },
        { label: 'Tab two' },
        { label: 'Tab three' },
        { label: 'Tab four' },
        { label: 'Tab five' },
      ]}
      links={[
        { label: 'Im a link', onClick: action('you clicked the link') },
      ]}
      small
      activeItem={2}
      onClickItem={(action('clicked tab item'))}
    />
  </Padded>
);

export const CheckboxTabs = () => (
  <Padded>
    <Tabs
      items={[
        { label: 'Tab one', complete: true },
        { label: 'Tab two' },
        { label: 'Tab three', complete: true },
        { label: 'Tab four' },
        { label: 'Tab five', complete: true },
      ]}
      checkbox
      activeItem={2}
      onClickItem={(action('clicked tab item'))}
    />
  </Padded>
);
