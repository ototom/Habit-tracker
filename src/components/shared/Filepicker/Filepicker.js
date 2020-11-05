import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button/Button';
import './Filepicker.scss';

const Filepicker = (props) => {
    const [preview, setPreview] = useState();
    const [file, setFile] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(false);

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

    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
    };

    useEffect(() => {
        if (!isLoading) return;
        const simulateData = () => {
            setResponse(true);
            setIsLoading(false);
        };

        window.setTimeout(simulateData, 2000);

        return () => clearTimeout(simulateData);
    }, [isLoading]);

    useEffect(() => {
        if (!file) {
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPreview(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }, [file]);
    return (
        <form onSubmit={submitHandler} encType='multipart/form-data'>
            <div className='file__preview'>
                {preview && <img src={preview} alt='Avatar preview' />}
            </div>
            <input
                type='file'
                name='file'
                id='file'
                accept='.png,.jpg,.jpeg'
                style={{ display: 'none' }}
                ref={ref}
                onChange={pickedHandler}
            />
            {response && !isLoading && (
                <div className='alert__success'>
                    File has been sent successfully!
                </div>
            )}
            <div
                className={`file__uploader ${
                    !preview ? 'file__uploader--no-file' : ''
                }`}
            >
                <span className='file__name'>
                    <i className='fas fa-paperclip'></i>
                    {file
                        ? file.name.length > 16
                            ? file.name.substr(0, 16) + '...'
                            : file.name
                        : null}
                </span>
                <button
                    className='file__picker-btn'
                    onClick={pickFileHandler}
                    type='button'
                ></button>
            </div>

            <Button
                className='btn--info btn--full-width file__submit-btn'
                disabled={isLoading || !file}
                type='submit'
            >
                {isLoading ? (
                    <div className='spinner'>
                        <i className='fas fa-spinner'></i>
                    </div>
                ) : (
                    'Send'
                )}
            </Button>
        </form>
    );
};

export default Filepicker;
