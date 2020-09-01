/**
 * @module EntriesTable Component
 * @description
 * A custom implementation of a `Table`. Meant to display entries received from the API.
 * Will attach an `actions` column, with a fold out menu.
 */
import React from 'react';
import './entriesTable.scss';
import Table from '../../table/Table';
import ActionMenu from '../../table/ActionMenu';

import { ReactComponent as IconActions } from '../../../images/icon-ellipsis.svg';
import { ReactComponent as IconView } from '../../../images/icon-eye-open.svg';
import { ReactComponent as IconDelete } from '../../../images/icon-trash.svg';

/// Append the action header as a column
const getColsWithAction = (cols) => [
  ...cols,
  { Header: <IconActions />, accessor: 'actions' },
];

const buildRowActions = (entry, onDeleteRow, onViewRow, idField) => [
  { label: 'view', icon: <IconView />, handlerFn: onViewRow && onViewRow(entry[idField]) },
  { label: 'delete', icon: <IconDelete />, handlerFn: onDeleteRow && onDeleteRow(entry[idField]) },
];

/// Append the action menu as a column on each row
const getRowsWithActionCol = (rows, onDeleteRow, onViewRow, idField) => rows.map((entry) => ({
  ...entry,
  actions: (
    <ActionMenu actions={buildRowActions(entry, onDeleteRow, onViewRow, idField)}>
      <IconActions />
    </ActionMenu>
  ),
}));

/// All columns except `actions` are sortable
const getSortableCols = (cols) => cols.map((col) => col.accessor);

const EntriesTable = ({
  title, cols, rows, onDeleteRow, onViewRow, idField, headerModifiers = {}, sortable = true,
}) => (
  <div className="entries-table">
    { title && <h6 className="entries-table__title">{ title }</h6> }
    <Table
      cols={getColsWithAction(cols)}
      rowData={getRowsWithActionCol(rows, onDeleteRow, onViewRow, idField)}
      pageLength={4}
      sortableCols={sortable ? getSortableCols(cols) : []}
      headerModifiers={{
        ...headerModifiers,
        actions: { actions: true },
      }}
      columnModifiers={{ actions: { actions: true } }}
    />
  </div>
);

export default EntriesTable;
