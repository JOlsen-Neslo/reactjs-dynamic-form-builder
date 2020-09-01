// TODO: Convert to mdx for better documentation
import React from 'react';
import { action } from '@storybook/addon-actions';
import Table from './Table';
import { Padded } from '../../stories/helpers';

import { ReactComponent as IconEllipsis } from '../../images/icon-ellipsis.svg';
import { ReactComponent as IconDelete } from '../../images/icon-trash.svg';
import { ReactComponent as IconView } from '../../images/icon-eye-open.svg';

import ActionMenu from './ActionMenu';

export default {
  title: 'Structure | Table',
  components: [Table],
};

const tableHeaders = [
  { Header: 'First Column', accessor: 'firstCol' },
  { Header: 'Centered Column', accessor: 'secondCol' },
  { Header: 'Bold data', accessor: 'thirdCol' },
];

const tableHeadersWithAction = [
  { Header: 'First Column', accessor: 'firstCol' },
  { Header: 'Centered Column', accessor: 'secondCol' },
  { Header: 'Bold data', accessor: 'thirdCol' },
  { Header: <IconEllipsis />, accessor: 'actions' },
];

const getRow = (firstCol, secondCol, thirdCol, actions = null) => ({
  firstCol, secondCol, thirdCol, actions,
});

const smallRowData = [
  getRow('Hello', 'Table', 'Component!'),
  getRow(
      <h6>Logo goes here</h6>,
    <strong>Event components can be rendered here</strong>,
    'Component!',
  ),
];

const headerModifiers = {
  secondCol: {
    center: true,
  },
};

const columnModifiers = {
  secondCol: {
    center: true,
  },
  thirdCol: {
    strong: true,
  },
};

const largeRowData = Array(47).fill(0).map((_, index) => getRow(`Row ${index}`, 'Table', 'Component!'));

const rowActions = [
  { label: 'view', icon: <IconView />, handlerFn: action('View clicked') },
  { label: 'do something else', icon: <IconDelete />, handlerFn: action('Something else!!!') },
];

const largeRowDataWithActions = Array(47).fill(0).map((_, index) => getRow(
  `Row ${index}`,
  'Table',
  'Component!',
  (<ActionMenu actions={rowActions}>
    <IconEllipsis />
  </ActionMenu>),
));

export const WithColumns = () => (
  <Padded>
    <Table cols={tableHeaders} />
  </Padded>
);

export const WithColumnsAndData = () => (
  <Padded>
    <Table
      cols={tableHeaders}
      rowData={smallRowData}
    />
  </Padded>
);

export const WithPaginationAndCustomPageLength = () => (
  <Padded>
    <Table
      cols={tableHeaders}
      rowData={largeRowData}
      pageLength={5}
    />
  </Padded>
);

export const WithColumnFormatting = () => (
  <Padded>
    <Table
      cols={tableHeaders}
      rowData={largeRowData}
      headerModifiers={headerModifiers}
      columnModifiers={columnModifiers}
      pageLength={5}
    />
  </Padded>
);

export const WithSortControl = () => (
  <Padded>
    <Table
      cols={tableHeaders}
      rowData={largeRowData}
      headerModifiers={headerModifiers}
      columnModifiers={columnModifiers}
      pageLength={5}
      sortableCols={['firstCol', 'thirdCol']}
    />
  </Padded>
);

export const WithEntryActions = () => (
  <Padded>
    <Table
      cols={tableHeadersWithAction}
      rowData={largeRowDataWithActions}
      headerModifiers={{
        actions: {
          actions: true,
        },
      }}
      columnModifiers={{
        actions: {
          actions: true,
        },
      }}
      pageLength={5}
      sortableCols={['firstCol', 'thirdCol']}
    />
  </Padded>
);
