import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getDaysInMonth, isSameMonth, parseISO } from 'date-fns';

const Summary = ({ checkedDays, currentDate, selectedDate }) => {
    const [selectedMonthChecked, setSelectedMonthChecked] = useState([]);
    const [currentMonthChecked, setCurrentMonthChecked] = useState([]);

    useEffect(() => {
        const selectedMonthFilteredArr = checkedDays.filter((day) =>
            isSameMonth(parseISO(day.date), selectedDate)
        );
        const currentMonthFilteredArr = checkedDays.filter((day) =>
            isSameMonth(parseISO(day.date), currentDate)
        );

        setSelectedMonthChecked(selectedMonthFilteredArr);
        setCurrentMonthChecked(currentMonthFilteredArr);
    }, [checkedDays, currentDate, selectedDate]);

    return (
        <div className='col-6-sm col-3-md col-6-xl box'>
            <div className='box__header'>
                <h2>Summary</h2>
            </div>
            <div className='box__content'>
                <ul className='summary-list'>
                    <li>
                        Total check in's:
                        <span className='summary-list__value'>
                            {checkedDays.length}
                        </span>
                    </li>
                    <li>
                        Selected month progress:
                        <span className='summary-list__value'>
                            {Math.round(
                                (selectedMonthChecked.length /
                                    getDaysInMonth(selectedDate)) *
                                    100
                            )}
                            % ({selectedMonthChecked.length}/
                            {getDaysInMonth(selectedDate)})
                        </span>
                    </li>
                    <li>
                        Current month progress:
                        <span className='summary-list__value'>
                            {Math.round(
                                (currentMonthChecked.length /
                                    getDaysInMonth(currentDate)) *
                                    100
                            )}
                            % ({currentMonthChecked.length}/
                            {getDaysInMonth(currentDate)})
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

Summary.propTypes = {
    checkedDays: PropTypes.array,
    currentDate: PropTypes.object,
    selectedDate: PropTypes.object,
};

export default Summary;
