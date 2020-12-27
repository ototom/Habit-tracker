import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = (props) => {
    const input =
        props.type === 'textarea' ? (
            <textarea
                name={props.name}
                id={props.id}
                onChange={props.onChange}
                onBlur={props.onBlur}
                disabled={props.disabled}
                value={props.value}
                defaultValue={props.defaultValue}
            />
        ) : (
            <input
                type={props.type || 'text'}
                name={props.name}
                id={props.id}
                placeholder={props.placeholder}
                onChange={props.onChange}
                onBlur={props.onBlur}
                disabled={props.disabled}
                value={props.value}
                defaultValue={props.defaultValue}
            />
        );
    return (
        <div className='form-field'>
            {props.label && <label htmlFor={props.id}>{props.label}</label>}
            <div
                className={`${
                    props.type === 'textarea'
                        ? 'form-field__textarea'
                        : 'form-field__input'
                } ${props.icon ? 'form-field__input--with-icon' : ''}`}
            >
                {input}
                {props.icon && props.type !== 'textarea' && (
                    <span className='form-field__icon'>
                        <i className={props.icon}></i>
                    </span>
                )}
            </div>
            {props.error && props.touched && (
                <p className='form-field__notification'>{props.error}</p>
            )}
        </div>
    );
};

Input.propTypes = {
    error: PropTypes.string,
    touched: PropTypes.bool,
    icon: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
};

export default Input;
