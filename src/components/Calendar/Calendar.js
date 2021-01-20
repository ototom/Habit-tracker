import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Calendar.scss';
import { authContext } from '../../context/auth-context';
import { dataContext } from '../../context/data-context';
import { getDate, isSameDay, parseISO } from 'date-fns';
import { useWindowWidth } from '../../hooks/use-window-width';
import { useRequest } from '../../hooks/use-request';

const Calendar = ({ data, updateDay, id }) => {
    const calendarRef = useRef();
    const { width } = useWindowWidth();
    const { token } = useContext(authContext);
    const { dispatch } = useContext(dataContext);
    const { sendRequest, setIsLoading } = useRequest(false);

    const markDayHandler = async (e) => {
        if (e.target.classList.contains('blocked')) return;
        if (!e.target.dataset.date) return;

        updateDay(
            e.target.dataset.date,
            !e.target.classList.contains('checked')
        );

        sendRequest('habit/check', {
            method: 'POST',
            token,
            body: { habitId: id, date: e.target.dataset.date },
        }).then(() => {
            dispatch({
                value: 'UPDATE',
                payload: {
                    habitId: id,
                    date: e.target.dataset.date,
                },
            });
            setIsLoading(false);
        });
    };

    useEffect(() => {
        const setCalendarHeight = () => {
            if (calendarRef.current && data.length > 0) {
                calendarRef.current.style.height =
                    calendarRef.current.offsetWidth * (data.length / 7) + 'px';
            }
        };

        setCalendarHeight();
    }, [data, width]);

    return (
        <div className='calendar'>
            <div className='calendar__header'>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
            </div>
            <div
                className='calendar__month'
                ref={calendarRef}
                onClick={markDayHandler}
            >
                {data.map((week, i) => {
                    return (
                        <div key={i} className='calendar__week'>
                            {week.map((day, i) => {
                                return (
                                    <div
                                        key={i}
                                        data-date={day.date}
                                        className={`${
                                            day.checked ? 'checked' : ''
                                        } ${
                                            isSameDay(
                                                parseISO(day.date),
                                                new Date()
                                            )
                                                ? 'today'
                                                : ''
                                        } ${
                                            day.isBlocked ? 'blocked' : ''
                                        } calendar__day`}
                                    >
                                        {getDate(new Date(day.date))}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

Calendar.propTypes = {
    data: PropTypes.array,
    updateDay: PropTypes.func,
    id: PropTypes.string,
};

export default Calendar;
