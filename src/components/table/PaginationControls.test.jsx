import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';

import PaginationControls from './PaginationControls';

describe('PaginationControls', () => {
  let component; let fakePreviousPage; let fakeNextPage; let
    fakeGotoPage;

  function setup(pageIndex = 0) {
    fakePreviousPage = jest.fn();
    fakeNextPage = jest.fn();
    fakeGotoPage = jest.fn();

    component = render(
      <PaginationControls
        pageIndex={pageIndex}
        pageCount={10}
        canPreviousPage={pageIndex !== 0}
        previousPage={fakePreviousPage}
        canNextPage={pageIndex !== 9}
        nextPage={fakeNextPage}
        gotoPage={fakeGotoPage}
      />,
    );
  }

  describe('when pageIndex is 0', () => {
    beforeEach(() => {
      setup();
    });

    test('should display the first 3 page numbers', () => {
      const { getByText } = component;

      expect(getByText('1')).toBeInTheDocument();
      expect(getByText('2')).toBeInTheDocument();
      expect(getByText('3')).toBeInTheDocument();
    });

    test('should have the "previous" button disabled', () => {
      const { container } = component;
      const firstButtonEl = container.querySelector('button');
      expect(firstButtonEl).toBeDisabled();
    });
  });

  describe('when pageIndex is somewhere between first and last pages', () => {
    beforeEach(() => {
      setup(5);
    });

    test('should display the correct 3 page numbers', () => {
      const { getByText } = component;

      expect(getByText('5')).toBeInTheDocument();
      expect(getByText('6')).toBeInTheDocument();
      expect(getByText('7')).toBeInTheDocument();
    });

    test('should have the "previous" button enabled', () => {
      const { container } = component;
      const firstButtonEl = container.querySelector('button');
      expect(firstButtonEl).toBeEnabled();
    });

    test('should have the "next" button enabled', () => {
      const { container } = component;
      const lastButtonEl = container.querySelector('button:last-of-type');
      expect(lastButtonEl).toBeEnabled();
    });
  });

  describe('when pageIndex is the last page', () => {
    beforeEach(() => {
      setup(9);
    });

    test('should display the last 3 page numbers', () => {
      const { getByText } = component;

      expect(getByText('8')).toBeInTheDocument();
      expect(getByText('9')).toBeInTheDocument();
      expect(getByText('10')).toBeInTheDocument();
    });

    test('should have the "next" button disabled', () => {
      const { container } = component;
      const lastButtonEl = container.querySelector('button:last-of-type');
      expect(lastButtonEl).toBeDisabled();
    });
  });

  describe('page navigation', () => {
    beforeEach(() => {
      setup(5);
    });

    test('clicking the "previous" button should call "previousPage"', () => {
      const { container } = component;
      const previousButtonEl = container.querySelector('button');

      fireEvent.click(previousButtonEl);

      expect(fakePreviousPage).toHaveBeenCalledTimes(1);
    });

    test('clicking the "next" button should call "nextPage"', () => {
      const { container } = component;
      const nextButtonEl = container.querySelector('button:last-of-type');

      fireEvent.click(nextButtonEl);

      expect(fakeNextPage).toHaveBeenCalledTimes(1);
    });

    test('clicking a page number should call "gotoPage", with the correct page index', () => {
      const { getByText } = component;
      const pageButtonEl = getByText('5');

      fireEvent.click(pageButtonEl);

      expect(fakeGotoPage).toHaveBeenCalledWith(4);
    });
  });
});
