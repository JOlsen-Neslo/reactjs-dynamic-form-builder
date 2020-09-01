import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';

import FileInput, { formatFileExtensions } from './FileInput';

describe('FileInput', () => {
  let component;
  beforeEach(() => {
    component = render(
      <FileInput
        name="Test button"
        uploadInstruction="Better upload a file!"
      />,
    );
  });

  test('uses a native file input element', () => {
    const { container } = component;
    const inputEl = container.querySelector('input[type="file"]');

    expect(container).toContainElement(inputEl);
  });

  test('should display the `uploadInstruction` when no file has been uploaded', () => {
    const { getByText } = component;

    expect(getByText('Better upload a file!')).toBeInTheDocument();
  });

  test('clicking the upload button should open native file input without errors', () => {
    const { container } = component;
    const uploadButtonEl = container.querySelector('button');

    fireEvent.click(uploadButtonEl);

    // Nothing to expect here because we can't test that the file input dialog is open.
    // No error is good enough here.
  });

  describe('formatFileExtension', () => {
    test('should format file extensions for a file input', () => {
      const extensions = ['jpg', 'pdf', 'png'];

      expect(formatFileExtensions(extensions)).toEqual('.jpg, .pdf, .png');
    });
  });

  describe('uploading a file', () => {
    test('should render the filename in place of the instructions', () => {
      const { container, getByText } = render(
        <FileInput
          name="Test button"
          uploadInstruction="Instructions!"
        />,
      );

      const fileInputEl = container.querySelector('.file-input__native');

      // construct a file
      const file = new File(['(⌐□_□)'], 'chucknorris.png', {
        type: 'image/png',
      });

      // because file inputs' `files` property is read-only, we need to bypass them
      //  by defining a property `files` with an advantageous value
      Object.defineProperty(fileInputEl, 'files', {
        value: [file],
      });

      // then trigger the change
      fireEvent.change(fileInputEl);

      expect(getByText('chucknorris.png')).toBeInTheDocument();
    });
  });
});
