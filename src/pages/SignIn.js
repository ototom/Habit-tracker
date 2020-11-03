import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';

const SignIn = () => {
    return (
        <div className='auth row row--no-margin'>
            <div className='auth__form col-6-sm col-3-md col-4-xl'>
                <div className='auth__form-container'>
                    <h1>Sign in</h1>
                    <form>
                        <div className='form-field'>
                            <label htmlFor='email'>Email:</label>
                            <div className='form-field__input form-field__input--with-icon'>
                                <input
                                    type='email'
                                    name='user-email'
                                    id='email'
                                />
                                <span className='form-field__icon'>
                                    <i className='fas fa-user'></i>
                                </span>
                            </div>
                            <p className='form-field__notification is-warning'>
                                User does not exists
                            </p>
                        </div>
                        <div className='form-field'>
                            <label htmlFor='password'>Password:</label>
                            <div className='form-field__input form-field__input--with-icon'>
                                <input
                                    type='password'
                                    name='user-password'
                                    id='password'
                                />
                                <span className='form-field__icon'>
                                    <i className='fas fa-key'></i>
                                </span>
                            </div>
                        </div>
                        <div className='text-center'>
                            <button className='auth__submit'>Submit</button>
                        </div>
                    </form>
                    <div className='auth__nav'>
                        Don't have an account?
                        <Link to='/sign-up'>Create one!</Link>
                    </div>
                </div>
            </div>

            <div className='auth__hero col-3-md col-2-xl'>
                <div className='auth__hero-text'>
                    <h1>Welcome!</h1>
                    <p>Fill the form to have access to all features or...</p>
                    <Link to='/sign-up'>Switch to sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
