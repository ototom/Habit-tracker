import React from 'react';
import { format } from 'date-fns';
import './Datepicker.scss';

const Datepicker = (props) => {
    return (
        <div className={`datepicker ${props.className ? props.className : ''}`}>
            <button className='datepicker__btn' onClick={props.prevDateHandler}>
                <i className='fas fa-chevron-left'></i>
            </button>
            <span className='datepicker__date'>
                {format(props.date, props.format)}
            </span>
            <button className='datepicker__btn' onClick={props.nextDateHandler}>
                <i className='fas fa-chevron-right'></i>
            </button>
        </div>
    );
};

export default Datepicker;
