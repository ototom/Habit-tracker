import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button/Button';
import './Filepicker.scss';
import { success, danger } from '../Notification';
import { useLoading } from '../../../hooks/use-loading';

const Filepicker = (props) => {
    const { isLoading, setIsLoading } = useLoading();
    const [preview, setPreview] = useState();
    const [file, setFile] = useState();
    const [response, setResponse] = useState(false);
    const [error, setError] = useState('');

    const ref = useRef();

    const pickFileHandler = () => {
        ref.current.click();
    };

    const pickedHandler = (e) => {
        if (e.target.files && e.target.files.length === 1) {
            const pickedFile = e.target.files[0];
            if (pickedFile.size > 500000) {
                setError('Your file is too big');
            }
            setFile(pickedFile);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
    };

    useEffect(() => {
        if (error) {
            danger(error, false);
        }
    }, [error]);

    useEffect(() => {
        if (response && !isLoading) {
            success('File has been sent successfully', true);
        }
    }, [response, isLoading]);

    useEffect(() => {
        if (!isLoading) return;
        const simulateData = () => {
            setResponse(true);
            setIsLoading(false);
        };

        window.setTimeout(simulateData, 3000);

        return () => clearTimeout(simulateData);
    }, [isLoading, setIsLoading]);

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
            {/* <Button onClick={() => info('hello', true)}>
                Open notification
            </Button> */}
            {/* {notifications.map((notification) => (
                <Notification
                    key={notification.id}
                    color={notification.color}
                    closeHandler={() => closeHandler(notification.id)}
                    autoClose={true}
                >
                    {notification.message}
                </Notification>
            ))} */}
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
                disabled={isLoading || !file || !!error}
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
