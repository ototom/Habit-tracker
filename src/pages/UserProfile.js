import React from 'react';
import { useFormik } from 'formik';
import PageHeader from '../components/shared/PageHeader/PageHeader';
import Button from '../components/shared/Button/Button';
import Filepicker from '../components/shared/Filepicker/Filepicker';

const UserProfile = () => {
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
                            <Button type='submit' className='btn--info'>
                                Save
                            </Button>
                        </form>
                    </div>
                </div>
                <div className='col-6-sm col-3-lg col-2-xl box'>
                    <div className='box__header'>
                        <h2>Avatar</h2>
                    </div>
                    <div className='box__content'>
                        <Filepicker />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
