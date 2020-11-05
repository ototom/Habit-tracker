import { useFormik } from 'formik';
import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/shared/Button/Button';
import { authContext } from '../context/auth-context';

import './Auth.scss';

const SignIn = () => {
    const auth = useContext(authContext);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            auth.login();
        },
        validate: (values) => {
            const errors = {};

            if (!values.email) {
                errors.email = 'Email field is required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Password field is required';
            }

            return errors;
        },
    });
    return (
        <div className='auth row row--no-margin'>
            <div className='auth__form col-6-sm col-3-md col-4-xl'>
                <div className='auth__form-container'>
                    <h1>Sign in</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='form-field'>
                            <label htmlFor='email'>Email:</label>
                            <div className='form-field__input form-field__input--with-icon'>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className='form-field__icon'>
                                    <i className='far fa-envelope'></i>
                                </span>
                            </div>
                            {formik.errors.email && formik.touched.email && (
                                <p className='form-field__notification is-warning'>
                                    {formik.errors.email}
                                </p>
                            )}
                        </div>
                        <div className='form-field'>
                            <label htmlFor='password'>Password:</label>
                            <div className='form-field__input form-field__input--with-icon'>
                                <input
                                    type='password'
                                    name='password'
                                    id='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className='form-field__icon'>
                                    <i className='fas fa-key'></i>
                                </span>
                            </div>
                            {formik.errors.password &&
                                formik.touched.password && (
                                    <p className='form-field__notification is-warning'>
                                        {formik.errors.password}
                                    </p>
                                )}
                        </div>
                        <div className='text-center'>
                            <Button className='btn--primary' type='submit'>
                                Submit
                            </Button>
                        </div>
                    </form>
                    <div className='auth__nav'>
                        Don't have an account?
                        <Link to='/sign-up'>Create one!</Link>
                    </div>
                </div>
            </div>

            <div className='auth__hero col-3-md col-2-xl auth__hero--sign-in'>
                <div className='auth__hero-text'>
                    <h1>Welcome!</h1>
                    <p>Fill the form to have access to all features or...</p>
                    <Button
                        to='/sign-up'
                        className='btn--big btn--light btn--full-width'
                    >
                        Switch to sign up
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
