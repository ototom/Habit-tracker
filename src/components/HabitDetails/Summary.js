import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getDaysInMonth } from 'date-fns';

const Summary = ({ id, selectedDate, getSummary }) => {
    const [summary, setSummary] = useState({
        total: 0,
        selectedMonth: 0,
        currentMonth: 0,
    });

    useEffect(() => {
        const habitSummary = getSummary(id, selectedDate);

        setSummary(habitSummary);
    }, [getSummary, id, selectedDate]);

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
                            {summary.total}
                        </span>
                    </li>
                    <li>
                        Selected month progress:
                        <span className='summary-list__value'>
                            {Math.round(
                                (summary.selectedMonth /
                                    getDaysInMonth(selectedDate)) *
                                    100
                            )}
                            % ({summary.selectedMonth}/
                            {getDaysInMonth(selectedDate)})
                        </span>
                    </li>
                    <li>
                        Current month progress:
                        <span className='summary-list__value'>
                            {Math.round(
                                (summary.currentMonth /
                                    getDaysInMonth(new Date())) *
                                    100
                            )}
                            % ({summary.currentMonth}/
                            {getDaysInMonth(new Date())})
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

Summary.propTypes = {
    id: PropTypes.string,
    getSummary: PropTypes.func,
    selectedDate: PropTypes.object,
};

export default Summary;
