/**
 * @module FilterControls Component
 * @description
 * Meant to be used with a react-table. Accepts sort control functionality from react-table, and renders
 *  in a menu.
 * TODO: Search functionality (provided through react-table's useFilters hook)
 */
import React from 'react';
import {
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} from 'prop-types';
import './table.scss';

import { ReactComponent as IconChange } from '../../images/icon-change.svg';
import { ReactComponent as IconSearch } from '../../images/icon-search.svg';

import Select from '../select/Select';
import Input from '../input/Input';

const renderSearch = (search) => search && (
<Input
  small
  placeholder="Search"
  suffix={<IconSearch />}
/>
);

const FilterControls = ({ sortMenu, search }) => {
  const findColumn = (columnName) => sortMenu.find((col) => col.value === columnName);

  return (
    <div className="table-filters">
      { renderSearch(search) }
      <Select
        small
        icon={IconChange}
        placeholder="Sort"
        menuItems={sortMenu}
        onChange={(sortCol, e) => {
          const column = findColumn(sortCol);
          // run the column header's sort function, provided by react-table.
          column.sortFn(e);
        }}
      />
    </div>
  );
};

FilterControls.defaultProps = {
  search: true,
};

FilterControls.propTypes = {
  sortMenu: arrayOf(shape({
    label: string,
    value: oneOfType([number, string]),
    sortFn: func,
  })),
  search: bool,
};

export default FilterControls;
