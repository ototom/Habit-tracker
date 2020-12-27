import React, { useState } from 'react';
import { useContext } from 'react';
import AddNewHabit from '../components/Habit/AddNewHabit';
import Habit from '../components/Habit/Habit';
import Datepicker from '../components/shared/DatePicker/Datepicker';
import LoadingInline from '../components/shared/LoadingInline/LoadingInline';
import PageHeader from '../components/shared/PageHeader/PageHeader';
import { dataContext } from '../context/data-context';
import { useWindowWidth } from '../hooks/use-window-width';
import { addDays, subDays } from 'date-fns';

const Habits = () => {
    const { habits, isLoading } = useContext(dataContext);
    const { width } = useWindowWidth();
    const [date, setDate] = useState(new Date());

    const prevDateHandler = () => {
        setDate((date) => subDays(date, 1));
    };

    const nextDateHandler = () => {
        setDate((date) => addDays(date, 1));
    };

    return (
        <>
            <PageHeader
                rightSideContent={
                    width >= 768 && (
                        <Datepicker
                            prevDateHandler={prevDateHandler}
                            nextDateHandler={nextDateHandler}
                            format='do MMMM yyyy'
                            date={date}
                        />
                    )
                }
            >
                Habits
            </PageHeader>

            <div className='row'>
                <div className='col-6-sm box'>
                    {width < 768 && (
                        <Datepicker
                            prevDateHandler={prevDateHandler}
                            nextDateHandler={nextDateHandler}
                            format='do MMMM yyyy'
                            date={date}
                            className='datepicker--is-mobile'
                        />
                    )}

                    {habits.length > 0 ? (
                        habits.map((habit) => (
                            <Habit
                                name={habit.name}
                                key={habit._id}
                                id={habit._id}
                                days={habit.checkedDays}
                                date={date}
                            />
                        ))
                    ) : isLoading ? (
                        <LoadingInline
                            isLoading={isLoading}
                            message='Loading...'
                        />
                    ) : (
                        <p>There are no habits yet</p>
                    )}
                    <AddNewHabit />
                </div>
            </div>
        </>
    );
};

export default Habits;
