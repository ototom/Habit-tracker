import React from 'react';
import { useParams } from 'react-router-dom';
import Calendar from '../components/Calendar/Calendar';
import { useCalendar } from '../hooks/use-calendar';
import Datepicker from '../components/shared/DatePicker/Datepicker';
import PageHeader from '../components/shared/PageHeader/PageHeader';

const HabitDetails = () => {
    const habitId = useParams().id;

    const { calendar, setDate, date, updateDay } = useCalendar();

    const nextMonthHandler = () => {
        const month = date.getMonth();
        const year = date.getFullYear();

        if (month === 11) {
            setDate(new Date(year + 1, 0, 1));
        } else {
            setDate(new Date(year, month + 1, 1));
        }
    };

    const prevMonthHandler = () => {
        const month = date.getMonth();
        const year = date.getFullYear();

        if (month === 0) {
            setDate(new Date(year - 1, 11, 1));
        } else {
            setDate(new Date(year, month - 1, 1));
        }
    };

    return (
        <>
            <PageHeader>Habit {habitId} - summary</PageHeader>
            {/* <div className='content'> */}
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
                            data={calendar}
                            date={date}
                            updateDay={updateDay}
                        />
                    </div>
                </div>
                <div className='col-6-sm col-2-xl '>
                    <div className='row row--no-margin'>
                        <div className='col-6-sm col-3-md col-6-xl box'>
                            <div className='box__header'>
                                <h2>Summary</h2>
                            </div>
                            <div className='box__content'>
                                <ul className='summary-list'>
                                    <li>
                                        Total check in's:
                                        <span className='summary-list__value'>
                                            40
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
                                <button className='btn btn--danger-outline btn--full-width btn--big'>
                                    <i className='far fa-trash-alt'></i>
                                    Delete
                                </button>
                                <button className='btn btn--info-outline btn--full-width btn--big'>
                                    <i className='far fa-edit'></i>Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    );
};

export default HabitDetails;
