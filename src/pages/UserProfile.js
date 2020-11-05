import React, { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import PageHeader from '../components/shared/PageHeader/PageHeader';

const UserProfile = () => {
    const [preview, setPreview] = useState();
    const [file, setFile] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(false);
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            currentPassword: '',
        },
        onSubmit: (values) => {
            console.log(values);
        },
        validate: (values) => {
            const errors = {};

            if (!values.currentPassword) {
                errors.currentPassword = 'You must confirm changes';
            }

            return errors;
        },
    });

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
        <>
            <PageHeader>Your profile</PageHeader>
            <div className='row'>
                <div className='col-6-sm col-3-lg col-4-xl box'>
                    <div className='box__header'>
                        <h2>Personal information</h2>
                    </div>
                    <div className='box__content'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='form-field'>
                                <label htmlFor='name'>Name:</label>
                                <div className='form-field__input'>
                                    <input
                                        type='text'
                                        name='name'
                                        id='name'
                                        value='Tom'
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='form-field'>
                                <label htmlFor='email'>Email:</label>
                                <div className='form-field__input'>
                                    <input
                                        type='email'
                                        name='email'
                                        id='email'
                                        value='example@mail.com'
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='form-field'>
                                <label htmlFor='newPassword'>Password:</label>
                                <div className='form-field__input'>
                                    <input
                                        type='password'
                                        name='newPassword'
                                        id='newPassword'
                                        placeholder='New password'
                                        onChange={formik.handleChange}
                                        value={formik.values.newPassword}
                                    />
                                </div>
                            </div>
                            <div className='form-field'>
                                <label htmlFor='currentPassword'>
                                    Confirm changes:
                                </label>
                                <div className='form-field__input'>
                                    <input
                                        type='password'
                                        name='currentPassword'
                                        id='currentPassword'
                                        placeholder='Your current password'
                                        onChange={formik.handleChange}
                                        value={formik.values.currentPassword}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.errors.currentPassword &&
                                    formik.touched.currentPassword && (
                                        <p className='form-field__notification is-warning'>
                                            {formik.errors.currentPassword}
                                        </p>
                                    )}
                            </div>
                            <button className='form-btn form-btn--blue'>
                                Save
                            </button>
                        </form>
                    </div>
                </div>
                <div className='col-6-sm col-3-lg col-2-xl box'>
                    <div className='box__header'>
                        <h2>Avatar</h2>
                    </div>
                    <div className='box__content'>
                        <form
                            onSubmit={submitHandler}
                            encType='multipart/form-data'
                        >
                            <div className='file__preview'>
                                {preview && (
                                    <img src={preview} alt='Avatar preview' />
                                )}
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

                            <button
                                className='file__submit-btn'
                                disabled={isLoading || !file}
                                type='submit'
                            >
                                {isLoading ? (
                                    <div className='spinner'>
                                        <i class='fas fa-spinner'></i>
                                    </div>
                                ) : (
                                    'Send'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
