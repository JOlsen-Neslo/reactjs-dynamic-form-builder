/**
 * @module Table Component
 * @description
 * A table driven by `react-table` (https://github.com/tannerlinsley/react-table), which gives
 *  us many table data-handling tools like sorting, filtering and pagination.
 * By using the `useTable` hook, we simply add table functionality using our own UI elements.
 */
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  arrayOf,
  bool,
  node,
  number,
  object,
  oneOfType,
  shape,
  string,
} from 'prop-types';
import {
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';

import {
  getClassNames,
  isNull,
  isUndefined,
} from '../../tools/helpers';

import PaginationControls from './PaginationControls';
import FilterControls from './FilterControls';

import './table.scss';

/**
 * Renders the header row, applying react-table properties to `tr` and `th`.
 * @param {Object[]} headerGroups - Header row, containing header column properties
 * @param {Object} headerModifiers - Object with keys being the column id,
 *  containing class modifiers for the header column.
 */
const renderHeaders = (headerGroups, headerModifiers) => headerGroups.map((headerGroup) => (
  <tr {...headerGroup.getHeaderGroupProps()}>
    { headerGroup.headers.map((column) => (
      <th
        {...column.getHeaderProps()}
        className={getClassNames('table-heading', headerModifiers[column.id])}
      >
        { column.render('Header') }
      </th>
    )) }
  </tr>
));

/**
 * Renders each data row, and their `td` elements, applying react-table properties.
 * @param {Object[]} page - A collection of data rows, contained within the current page
 * @param {function} prepareRow - react-table provided function to execute on a row before display
 * @param {Object} columnModifiers - Object with keys being the column id,
 *  containing class modifiers for a column of data.
 */
const renderRows = (page, prepareRow, columnModifiers) => page.map((row) => {
  prepareRow(row);

  return (
    <tr className="table-row" {...row.getRowProps()}>
      { row.cells.map((cell) => (
        <td
          {...cell.getCellProps()}
          className={getClassNames('table-cell', columnModifiers[cell.column.id])}
        >
          { cell.render('Cell') }
        </td>
      )) }
    </tr>
  );
});

/**
 * Formats the sortable columns into menu items, containing the react-table header sort functions.
 * @param {Object[]} headers - column header objects received from react-table
 * @param {string[]} sortableCols - list of provided column ids to allow sorting upon
 */
const formatHeaderMenuItems = (headers, sortableCols) => sortableCols.map((colId) => {
  const column = headers.find((header) => header.id === colId);

  return {
    value: colId,
    label: column.Header,
    sortFn: column.getSortByToggleProps().onClick,
  };
});

/**
 * If a list of sortable column names are provided, render filter controls.
 * @param {string[]} sortableCols - list of column names to allow sorting upon
 * @param {Object[]} headerGroups - react-table provided header group objects (we only use one group)
 * @param {boolean}  search      - whether or not to display the search bar
 */
const renderFilters = (sortableCols, headerGroups, search) => {
  const { headers } = headerGroups[0];

  return sortableCols.length > 0 && (
    <div className="table__filters">
      <FilterControls
        sortMenu={formatHeaderMenuItems(headers, sortableCols)}
        search={search}
      />
    </div>
  );
};

/** Only render pagination controls if there are more than one page. */
const renderPaginationControls = (canPreviousPage, canNextPage, pageCount, gotoPage, nextPage, previousPage, pageIndex, pageSize) => pageCount > 1 && (
<div className="table__pagination">
  <PaginationControls
    pageIndex={pageIndex}
    pageSize={pageSize}
    pageCount={pageCount}
    canPreviousPage={canPreviousPage}
    previousPage={previousPage}
    canNextPage={canNextPage}
    nextPage={nextPage}
    gotoPage={gotoPage}
  />
</div>
);

/**
 * Calculate the height of the table (so that it maintains height regardless of the pageLength).
 * We add one to accommodate the table header row.
 * @param {HTMLElement} tableRow - any row belonging to the table
 * @param {number} pageLength - table's page length
 */
const calculateTableHeight = (tableRow, pageLength) => tableRow.offsetHeight * (pageLength + 1);

const renderTitle = (title) => title && <p className="typo-h5 table__title">{ title }</p>;

const Table = ({
  cols, rowData, headerModifiers, columnModifiers, pageLength, sortableCols = [], narrow, title, search,
}) => {
  // react-table requires us to use memoisation on the columns and data to gain speed optimisations
  const columns = useMemo(() => cols, [cols]);
  const data = useMemo(() => rowData, [rowData]);

  const tableRef = useRef(null);
  const [tableHeight, setTableHeight] = useState(null);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: pageLength },
    },
    useSortBy,
    usePagination,
  );

  // on update of tableRef or pageLength, figure out what the height is of the table, and set it
  useEffect(() => {
    const tableRow = tableRef.current.querySelector('.table-row');
    if (isUndefined(tableRow) || isNull(tableRow)) {
      return;
    }

    setTableHeight(`${calculateTableHeight(tableRow, pageLength)}px`);
  }, [tableRef, pageLength]);

  return (
    <>
      <div className="table__toolbar">
        { renderTitle(title) }
        { renderFilters(sortableCols, headerGroups, search) }
      </div>

      <div className="table-container" style={{ height: tableHeight }}>
        <table {...getTableProps()} className="table" ref={tableRef}>
          <thead className={getClassNames('table__header', { narrow })}>
            { renderHeaders(headerGroups, headerModifiers) }
          </thead>

          <tbody {...getTableBodyProps()} className={getClassNames('table__body', { narrow })}>
            { renderRows(page, prepareRow, columnModifiers) }
          </tbody>
        </table>
      </div>

      { renderPaginationControls(canPreviousPage, canNextPage, pageCount, gotoPage, nextPage, previousPage, pageIndex, pageSize) }
    </>
  );
};

Table.defaultProps = {
  rowData: [],
  headerModifiers: {},
  columnModifiers: {},
  pageLength: 10,
  search: true,
};

Table.propTypes = {
  cols: arrayOf(shape({
    Header: oneOfType([string, node]).isRequired,
    accessor: string.isRequired,
  })).isRequired,
  rowData: arrayOf(object),
  headerModifiers: object,
  columnModifiers: object,
  pageLength: number,
  sortableCols: arrayOf(string),
  title: string,
  search: bool,
};

export default Table;
