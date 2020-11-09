import React from 'react';
import { useFormik } from 'formik';
import PageHeader from '../components/shared/PageHeader/PageHeader';
import Button from '../components/shared/Button/Button';
import Input from '../components/shared/Input/Input';
import FileUpload from '../components/shared/FileUpload/FileUpload';

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

            if (values.newPassword && values.newPassword.length < 6) {
                errors.newPassword =
                    'New password must consists of minimum 6 characters';
            }
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
                            <Input
                                label='Name:'
                                type='text'
                                name='name'
                                id='name'
                                value='Tom'
                                disabled
                            />
                            <Input
                                label='Email:'
                                type='text'
                                name='email'
                                id='email'
                                value='example@mail.com'
                                disabled
                            />
                            <Input
                                label='Password:'
                                type='password'
                                name='newPassword'
                                id='newPassword'
                                placeholder='Your new password'
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.newPassword}
                                touched={formik.touched.newPassword}
                            />
                            <Input
                                label='Confirm changes:'
                                type='password'
                                name='currentPassword'
                                id='currentPassword'
                                placeholder='Enter your current password'
                                value={formik.values.currentPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.currentPassword}
                                touched={formik.touched.currentPassword}
                            />
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
                        <FileUpload />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
