import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import {
  DarkBg,
  Padded,
} from '../../stories/helpers';
import { ReactComponent as IconCommunity } from '../../images/icon-community.svg';
import { ReactComponent as IconEyeOpen } from '../../images/icon-eye-open.svg';
import { ReactComponent as IconFile } from '../../images/icon-file.svg';
import { ReactComponent as IconExit } from '../../images/icon-exit.svg';

import Sidebar from './Sidebar';

export default {
  title: 'Structure | Sidebar',
  components: [Sidebar],
};

const menuItems = [
  { path: '/section-1', name: 'section-1' },
  { path: '/area-b', name: 'area-b' },
  { path: '/region-III', name: 'region-III' },
];

const footerItems = [
  { path: '/exit', name: 'exit' },
];

const itemLabels = {
  'section-1': 'Secton 1',
  'area-b': 'Area B',
  'region-III': 'Region III',
  exit: 'Exit',
};

const itemIcons = {
  'section-1': <IconCommunity />,
  'area-b': <IconEyeOpen />,
  'region-III': <IconFile />,
  exit: <IconExit />,
};

export const NoRouteMatch = () => (
  <MemoryRouter initialEntries={['/']}>
    <DarkBg>
      <Padded width="400px">
        <Sidebar
          menuItems={menuItems}
          itemLabels={itemLabels}
          footerItems={footerItems}
          itemIcons={itemIcons}
        />
      </Padded>
    </DarkBg>
  </MemoryRouter>
);

export const ActiveRoute = () => (
  <MemoryRouter initialEntries={['/area-b']}>
    <DarkBg>
      <Padded width="400px">
        <Sidebar
          menuItems={menuItems}
          itemLabels={itemLabels}
          footerItems={footerItems}
          itemIcons={itemIcons}
        />
      </Padded>
    </DarkBg>
  </MemoryRouter>
);
