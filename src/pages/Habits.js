import React from 'react';
import AddNewHabit from '../components/Habit/AddNewHabit';
import Habit from '../components/Habit/Habit';
import Datepicker from '../components/shared/DatePicker/Datepicker';
import PageHeader from '../components/shared/PageHeader/PageHeader';
import { useWindowWidth } from '../hooks/use-window-width';

const Habits = () => {
    const { width } = useWindowWidth();

    return (
        <>
            <PageHeader
                rightSideContent={
                    width >= 768 && (
                        <Datepicker format='do MMMM yyyy' date={new Date()} />
                    )
                }
            >
                Habits
            </PageHeader>

            <div className='row'>
                <div className='col-6-sm box'>
                    {width < 768 && (
                        <Datepicker
                            format='do MMMM yyyy'
                            date={new Date()}
                            className='datepicker--is-mobile'
                        />
                    )}
                    <Habit />
                    <Habit />
                    <Habit />
                    <Habit />
                    <Habit />
                    <AddNewHabit />
                </div>
            </div>
        </>
    );
};

export default Habits;
