import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Habit.scss';
import { isSameDay, parseISO } from 'date-fns';
import { authContext } from '../../context/auth-context';
import { dataContext } from '../../context/data-context';
import { useRequest } from '../../hooks/use-request';

const Habit = ({ name, days, id, date }) => {
    const [isChecked, setIsChecked] = useState(false);
    const { token } = useContext(authContext);
    const { dispatch } = useContext(dataContext);
    const { sendRequest, setIsLoading } = useRequest(false);

    const checkHandler = async () => {
        dispatch({
            value: 'UPDATE',
            payload: {
                habitId: id,
                date: date.toISOString(),
            },
        });
        setIsChecked((prev) => !prev);

        try {
            await sendRequest('habit/check', {
                method: 'POST',
                token,
                body: { habitId: id, date: date.toISOString() },
            });

            setIsLoading(false);
        } catch (error) {}
    };

    useEffect(() => {
        const habitStatus = days.filter((day) => {
            return isSameDay(parseISO(day.date), date);
        });

        if (habitStatus.length > 0) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [days, date]);

    return (
        <section className='habit'>
            <button className='habit__checkbox-btn' onClick={checkHandler}>
                <span
                    className={`habit__check-icon ${
                        isChecked ? 'is-checked' : ''
                    }`}
                ></span>
            </button>
            <div className='habit__title'>
                <Link to={`/habit/${id}`}>{name}</Link>
            </div>
            <div className='habit__details'>{days.length}/30</div>
        </section>
    );
};

Habit.propTypes = {
    name: PropTypes.string,
    days: PropTypes.array,
    id: PropTypes.string,
    date: PropTypes.instanceOf(Date),
};

export default Habit;
