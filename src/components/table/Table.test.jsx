import React from 'react';
import { render } from '@testing-library/react';

import Table from './Table';

describe('Table', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Table
        cols={[
          { Header: 'Column Uno', accessor: 'colUno' },
          { Header: 'Column Dos', accessor: 'colDos' },
        ]}
        rowData={[
          { colUno: 'First row first column', colDos: 'First row second column' },
          { colUno: 'Second row first column', colDos: 'Second row second column' },
        ]}
      />,
    );
  });

  test('should use a native table element', () => {
    const { container } = component;

    const tableEl = container.querySelector('table');
    expect(tableEl).toBeInTheDocument();
  });

  test('should render column headers correctly', () => {
    const { getByText } = component;

    expect(getByText('Column Uno')).toBeInTheDocument();
    expect(getByText('Column Dos')).toBeInTheDocument();
  });

  test('should render data rows correctly', () => {
    const { container } = component;

    const cells = container.querySelectorAll('tbody tr td');

    expect(cells[0]).toHaveTextContent('First row first column');
    expect(cells[1]).toHaveTextContent('First row second column');
    expect(cells[2]).toHaveTextContent('Second row first column');
    expect(cells[3]).toHaveTextContent('Second row second column');
  });
});
