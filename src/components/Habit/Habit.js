import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Habit.scss';

const Habit = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <section className='habit'>
            <header className='habit__header'>
                <h2>Habit name</h2>
            </header>
            <div className='habit__details'>
                <button
                    onClick={() => {
                        setIsChecked((prev) => !prev);
                    }}
                    className={`${isChecked ? 'is-checked' : ''}`}
                >
                    {isChecked ? (
                        <i className='fas fa-calendar-check'></i>
                    ) : (
                        <i className='fas fa-calendar'></i>
                    )}
                </button>
                <span className='habit__counter'>13/30</span>
            </div>
            <div className='habit__nav'>
                <Link to='/details'>
                    <i className='fas fa-chart-bar'></i>
                </Link>
            </div>
        </section>
    );
};

export default Habit;
