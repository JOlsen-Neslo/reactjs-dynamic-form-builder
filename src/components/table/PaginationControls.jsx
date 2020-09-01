/**
 * @module PaginationControls Component
 * @description
 * A UI wrapping `react-table`'s pagination functionality. All props come directly from
 *  `react-table`'s `usePagination` hook.
 */
import React from 'react';
import {
  bool,
  func,
  number,
} from 'prop-types';

import { getClassNames } from '../../tools/helpers';

import { ReactComponent as IconChevLeft } from '../../images/icon-chev-left.svg';
import { ReactComponent as IconChevRight } from '../../images/icon-chev-right.svg';

import './paginationControls.scss';

/**
 * Given all the number of pages, always choose 3 pages to display.
 * @param {number} pageIndex - Index of the current active page
 * @param {number} pageCount - Total number of pages
 * @example <caption>pageIndex=5; pageCount=10;</caption>
 * getDisplayPageNumbers(5, 10);
 * // selects " 1 2 3 [4 5 6] 7 8 9 10 "
 */
const getDisplayPageNumbers = (pageIndex, pageCount) => {
  // array containing page numbers
  const pageNumberArray = Array(pageCount).fill(0).map((_, pageNo) => pageNo);

  switch (true) {
    // at the start, choose the first 3 pages
    case pageIndex === 0:
      return pageNumberArray.slice(0, 3);

      // at the end, choose the final 3 pages
    case pageIndex === (pageCount - 1):
      return pageNumberArray.slice(-3);

      // in the middle, choose 3 surrounding pages
    default:
      return pageNumberArray.slice(pageIndex - 1, pageIndex + 2);
  }
};

/** Outputs buttons for each page number displayed. */
const renderPageNumbers = (pageCount, pageIndex, gotoPage) => {
  const pageNumbersToDisplay = getDisplayPageNumbers(pageIndex, pageCount);

  return pageNumbersToDisplay.map((pageNumber) => (
    <button
      type="button"
      key={pageNumber}
      onClick={() => gotoPage(pageNumber)}
      className={getClassNames('pagination-control', { active: pageIndex === pageNumber })}
    >
      { pageNumber + 1 }
    </button>
  ));
};

const PaginationControls = ({
  pageIndex,
  pageCount,
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
  gotoPage,
}) => (
  <div className="pagination">
    <button
      type="button"
      className="pagination-control"
      disabled={!canPreviousPage}
      onClick={() => previousPage()}
    >
      <IconChevLeft className="pagination-control__icon" />
    </button>

    { renderPageNumbers(pageCount, pageIndex, gotoPage) }

    <button
      type="button"
      className="pagination-control"
      disabled={!canNextPage}
      onClick={() => nextPage()}
    >
      <IconChevRight className="pagination-control__icon" />
    </button>
  </div>
);

PaginationControls.propTypes = {
  pageIndex: number.isRequired,
  pageCount: number.isRequired,
  canPreviousPage: bool.isRequired,
  previousPage: func.isRequired,
  canNextPage: bool.isRequired,
  nextPage: func.isRequired,
  gotoPage: func.isRequired,
};

export default PaginationControls;
