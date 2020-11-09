import React, { useState, useEffect } from 'react';
import { useLoading } from '../../../hooks/use-loading';
import './FileUpload.scss';
import FilePicker from './FilePicker';

const FileUpload = () => {
    const { isLoading, setIsLoading } = useLoading();
    const [preview, setPreview] = useState();
    const [file, setFile] = useState();

    const submitHandler = (e) => {
        e.preventDefault();

        // if (file.size > 500000) {
        //     danger('The file is too big', true);
        //     return;
        // }

        setIsLoading(true);
    };

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
        <>
            <div className='file__preview'>
                {preview && <img src={preview} alt='Avatar preview' />}
            </div>
            <FilePicker
                onSubmit={submitHandler}
                setFile={setFile}
                file={file}
                preview={preview}
                isLoading={isLoading}
            />
        </>
    );
};

export default FileUpload;
