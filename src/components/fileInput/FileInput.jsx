/**
 * @module FileInput Component
 * @description
 * Wrapper around a native `input[type='file']`. Will accept file type limitations,
 *  uploadInstructions, and provide a styled upload button that triggers the hidden
 * native input.
 * Upon uploading a file, it's name will be displayed in place of the `uploadInstructions`.
 */
import React, {
    Component,
    createRef
} from 'react';
import {
    arrayOf,
    func,
    node,
    object,
    oneOfType,
    string
} from 'prop-types';

import { noOp } from '../../tools/helpers';

import Button from '../button/Button';
import Input from '../input/Input';

import './fileInput.scss';

/**
 * Formats a list of filetype-extensions into a string for us by a file-input's
 *  `accept` property.
 * @param {string[]} formats - list of file extensions (no period included)
 * @returns string - concatenated list of extensions
 * @example <caption>For '.pdf', '.png' and '.fmv'</caption>
 * formatFileExtensions(['pdf', 'png', 'fmv'])
 * // returns '.pdf, .png, .fmv'
 */
export const formatFileExtensions = (formats) =>
    formats.map(format => `.${ format }`).join(', ');

class FileInput extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            uploadedFiles: []
        };
        
        this.inputEl = createRef();
    }
    
    /**
     * Event handler for changes to the native file input. Loops through added
     *  files, and adds the names to state.
     * Will fire the provided `onChange` handler directly after state update.
     */
    handleFileChange = (e) => {
        const { target: { files } } = e;
        const filenames = Array.from(files).map(file => file.name);
        
        this.setState({ uploadedFiles: filenames });
        this.props.onChange(e);
    };
    
    /** Trick to open the file-input dialog when custom upload button is clicked. */
    openFileInput = () => this.inputEl.current.click();
    
    /** If uploaded filelist is empty, display the provided instructions. */
    renderStatus() {
        const { uploadedFiles } = this.state;
        const { uploadInstruction } = this.props;
        
        return uploadedFiles.length !== 0 ? uploadedFiles.join(', ') : uploadInstruction;
    }
    
    renderInput() {
        const { label } = this.props;
        
        return (
            <>
                <div className='file-input__status'>
                    { this.renderStatus() }
                </div>
                <div className='file-input__action'>
                    <Button hollow label={ label } onClick={ this.openFileInput }/>
                </div>
            </>
        );
    }
    
    /**
     * Active state rendering, when a preview image is provided. Renders the image
     *  as background-image, for ease of rendering.
     */
    renderPreview() {
        return (
            <div className='file-input__preview'>
                <Input readOnly={ this.props.readOnly }>
                    <div className='file-input__preview-image'
                         style={ { backgroundImage: `url(${ this.props.preview })` } }/>
                </Input>
            </div>
        );
    }
    
    render() {
        const { name, formats, readOnly } = this.props;
        
        return (
            <div className='file-input'>
                <input
                    type='file'
                    className='file-input__native'
                    name={ name }
                    ref={ this.inputEl }
                    onChange={ this.handleFileChange }
                    accept={ formatFileExtensions(formats) }
                />
                { readOnly ? this.renderPreview() : this.renderInput() }
            </div>
        );
    }
}

FileInput.defaultProps = {
    formats: [],
    label: 'Upload',
    uploadInstruction: 'Upload a file',
    onChange: noOp
};

FileInput.propTypes = {
    name: string.isRequired,
    formats: arrayOf(string).isRequired,
    label: string.isRequired,
    uploadInstruction: oneOfType([string, object, node]),
    onChange: func.isRequired
};


export default FileInput;
