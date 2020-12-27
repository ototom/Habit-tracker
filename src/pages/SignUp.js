import { useFormik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/shared/Button/Button';
import Input from '../components/shared/Input/Input';
import './Auth.scss';
import { success } from '../components/shared/Notification';
import { useRequest } from '../hooks/use-request';

const SignUp = () => {
    const { sendRequest } = useRequest(true);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                await sendRequest('user/signup', {
                    method: 'POST',
                    body: values,
                });

                success('You have been signed up', true);
            } catch (error) {}
        },
        validate: (values) => {
            const errors = {};

            if (!values.name) {
                errors.name = 'Name field is required';
            }

            if (!values.email) {
                errors.email = 'Email field is required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Password field is required';
            } else if (values.password.length < 6) {
                errors.password =
                    'Password must consists of at least 6 characters';
            }

            return errors;
        },
    });
    return (
        <div className='auth row row--no-margin'>
            <div className='auth__form col-6-sm col-3-md col-4-xl'>
                <div className='auth__form-container'>
                    <h1>Sign up</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <Input
                            label='Name:'
                            icon='fas fa-user'
                            type='text'
                            name='name'
                            id='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.name}
                            touched={formik.touched.name}
                        />
                        <Input
                            label='Email:'
                            icon='fas fa-envelope'
                            type='email'
                            name='email'
                            id='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.email}
                            touched={formik.touched.email}
                        />
                        <Input
                            label='Password:'
                            icon='fas fa-key'
                            type='password'
                            name='password'
                            id='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.password}
                            touched={formik.touched.password}
                        />
                        <div className='text-center'>
                            <Button className='btn--info' type='submit'>
                                Submit
                            </Button>
                        </div>
                    </form>
                    <div className='auth__nav'>
                        Already have an account?
                        <Link to='/sign-in'>Sign in!</Link>
                    </div>
                </div>
            </div>

            <div className='auth__hero col-3-md col-2-xl auth__hero--sign-up'>
                <div className='auth__hero-text'>
                    <h1>Welcome!</h1>
                    <p>Create an account or if you have one...</p>
                    <Button
                        to='/sign-in'
                        className='btn--big btn--full-width btn--light'
                    >
                        Switch to sign in
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
