import React from 'react';
import './Datepicker.scss';

const Datepicker = () => {
    return (
        <div className='datepicker'>
            <button>
                <i className='fas fa-arrow-left'></i>
            </button>
            <span className='datepicker__date'>Monday, 20 oct 2020</span>
            <button>
                <i className='fas fa-arrow-right'></i>
            </button>
        </div>
    );
};

export default Datepicker;
