import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const FilePicker = ({ onSubmit, setFile, file, preview, isLoading }) => {
    const ref = useRef();

    const pickFileHandler = () => {
        ref.current.click();
    };

    const pickedHandler = (e) => {
        if (e.target.files && e.target.files.length === 1) {
            const pickedFile = e.target.files[0];
            setFile(pickedFile);
        }
    };
    return (
        <form onSubmit={onSubmit} encType='multipart/form-data'>
            <input
                type='file'
                name='file'
                id='file'
                accept='.png,.jpg,.jpeg'
                style={{ display: 'none' }}
                ref={ref}
                onChange={pickedHandler}
            />

            <div
                className={`file__upload ${
                    preview ? 'file__upload--has-file' : ''
                }`}
            >
                <input
                    className='file__name'
                    defaultValue={file && file.name}
                    disabled
                />

                <span className='file__icon'>
                    <i className='fas fa-paperclip'></i>
                </span>

                <button
                    className='file__picker-btn'
                    onClick={pickFileHandler}
                    type='button'
                >
                    Pick file
                </button>
            </div>

            <Button
                className='btn--info btn--full-width file__submit-btn'
                disabled={isLoading || !file}
                type='submit'
            >
                Send
            </Button>
        </form>
    );
};

FilePicker.propTypes = {
    onSubmit: PropTypes.func,
    setFile: PropTypes.func,
    file: PropTypes.object,
    preview: PropTypes.string,
    isLoading: PropTypes.bool,
};

export default FilePicker;
