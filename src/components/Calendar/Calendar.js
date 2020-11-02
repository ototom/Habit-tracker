import React from 'react';
import './Calendar.scss';

const Calendar = ({ data, date, updateDay }) => {
    const markDayHandler = (e) => {
        updateDay(
            e.target.textContent,
            !e.target.classList.contains('checked')
        );
    };

    return (
        <div className='calendar__container'>
            <table>
                <thead>
                    <tr>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                    </tr>
                </thead>
                <tbody onClick={markDayHandler}>
                    {data.map((week, i) => {
                        return (
                            <tr key={i}>
                                {week.map((day, i) => {
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    return (
                                        <td key={i}>
                                            <span
                                                className={`${
                                                    day.checked ? 'checked' : ''
                                                } ${
                                                    today.getMonth() ===
                                                        date.getMonth() &&
                                                    today.getFullYear() ===
                                                        date.getFullYear() &&
                                                    today.getDate() === day.day
                                                        ? 'today'
                                                        : ''
                                                }`}
                                            >
                                                {day.day}
                                            </span>
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;
