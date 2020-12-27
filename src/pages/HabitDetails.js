import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from '../components/Calendar/Calendar';
import { useCalendar } from '../hooks/use-calendar';
import Datepicker from '../components/shared/DatePicker/Datepicker';
import PageHeader from '../components/shared/PageHeader/PageHeader';
import { authContext } from '../context/auth-context';
import { info } from '../components/shared/Notification';
import { dataContext } from '../context/data-context';
import Confirm from '../components/shared/Confirm/Confirm';
import { useHistory } from 'react-router-dom';
import { addMonths, subMonths } from 'date-fns';
import Badge from '../components/shared/Badge/Badge';
import EditModal from '../components/HabitDetails/EditModal';
import { useRequest } from '../hooks/use-request';

const HabitDetails = () => {
    const habitId = useParams().id;
    const history = useHistory();
    const { habits, dispatch } = useContext(dataContext);
    const { token } = useContext(authContext);
    const [habit, setHabit] = useState({ checkedDays: [] });
    const [isEditMode, setIsEditMode] = useState(false);
    const [isConfirmActive, setIsConfirmActive] = useState(false);
    const { sendRequest } = useRequest(false);

    const { calendar, setDate, date, updateDay } = useCalendar(
        new Date(),
        habit.checkedDays
    );

    const nextMonthHandler = () => setDate(addMonths(date, 1));
    const prevMonthHandler = () => setDate(subMonths(date, 1));

    const deleteHandler = async () => {
        try {
            const data = await sendRequest(`habit/${habitId}`, {
                method: 'DELETE',
                token,
            });

            info(data.message, true);
            setIsConfirmActive(false);
            dispatch({ value: 'DELETE', payload: habitId });
        } catch (error) {}
    };

    useEffect(() => {
        const habit = habits.filter((habit) => habit._id === habitId);
        if (habit.length === 0) {
            history.push('/');
        }

        setHabit(...habit);
    }, [habits, habitId, history]);

    const cancelDeleteHandler = () => setIsConfirmActive(false);

    return (
        <>
            <EditModal
                token={token}
                dispatch={dispatch}
                habitId={habitId}
                isActive={isEditMode}
                closeModal={() => setIsEditMode(false)}
                habit={habit}
            />
            <Confirm
                onConfirm={deleteHandler}
                onCancel={cancelDeleteHandler}
                isActive={isConfirmActive}
            >
                Do you really want to delete this item?
            </Confirm>
            <PageHeader>{habit.name}</PageHeader>
            <div className='row'>
                <div className='col-6-sm col-4-xl box'>
                    <div className='box__header'>
                        <h2>Calendar</h2>
                        <Datepicker
                            format='MMMM yyyy'
                            date={date}
                            prevDateHandler={prevMonthHandler}
                            nextDateHandler={nextMonthHandler}
                        />
                    </div>

                    <div className='box__content'>
                        <Calendar
                            id={habitId}
                            data={calendar}
                            updateDay={updateDay}
                        />
                    </div>
                </div>
                <div className='col-6-sm col-2-xl '>
                    <div className='row row--no-margin'>
                        <div className='col-6-sm col-3-md col-6-xl box'>
                            <div className='box__header'>
                                <h2>
                                    Summary <Badge>Soon!</Badge>
                                </h2>
                            </div>
                            <div className='box__content'>
                                <ul className='summary-list'>
                                    <li>
                                        Total check in's:
                                        <span className='summary-list__value'>
                                            {habit.checkedDays.length}
                                        </span>
                                    </li>
                                    <li>
                                        Monthly progress:
                                        <span className='summary-list__value'>
                                            89% (30/31)
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-6-sm col-3-md col-6-xl box'>
                            <div className='box__header'>
                                <h2>Manage</h2>
                            </div>
                            <div className='box__content'>
                                <button
                                    className='btn btn--danger-outline btn--full-width btn--big'
                                    onClick={() => setIsConfirmActive(true)}
                                >
                                    <i className='far fa-trash-alt'></i>
                                    Delete
                                </button>
                                <button
                                    onClick={() =>
                                        setIsEditMode((prev) => !prev)
                                    }
                                    className='btn btn--info-outline btn--full-width btn--big'
                                >
                                    <i className='far fa-edit'></i>Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HabitDetails;
