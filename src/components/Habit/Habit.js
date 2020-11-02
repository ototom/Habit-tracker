import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Habit.scss';

const Habit = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <section className='habit'>
            <button
                className='habit__checkbox-btn'
                onClick={() => {
                    setIsChecked((prev) => !prev);
                }}
            >
                <span
                    className={`habit__check-icon ${
                        isChecked ? 'is-checked' : ''
                    }`}
                ></span>
            </button>
            <div className='habit__title'>
                <Link to='/habit/id'>Habit name</Link>
            </div>
            <div className='habit__details'>13/30</div>
        </section>
    );
};

export default Habit;
