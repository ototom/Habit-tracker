import { useFormik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/shared/Button/Button';
import './Auth.scss';

const SignUp = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            console.log(values);
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
                        <div className='form-field'>
                            <label htmlFor='name'>Name:</label>
                            <div className='form-field__input form-field__input--with-icon'>
                                <input
                                    type='text'
                                    name='name'
                                    id='name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className='form-field__icon'>
                                    <i className='fas fa-user'></i>
                                </span>
                            </div>
                            {formik.errors.name && formik.touched.name && (
                                <p className='form-field__notification is-warning'>
                                    {formik.errors.name}
                                </p>
                            )}
                        </div>
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
                            <Button className='btn--info' type='submit'>
                                Submit
                            </Button>
                        </div>
                    </form>
                    <div className='auth__nav'>
                        Already have an accound
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
