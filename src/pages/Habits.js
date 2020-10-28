import React from 'react';
import Habit from '../components/Habit/Habit';

import Datepicker from '../components/shared/Datepicker/Datepicker';
import MenuButton from '../components/shared/MenuButton/MenuButton';
import { useWindowWidth } from '../hooks/use-window-width';

const Habits = (props) => {
    const { width } = useWindowWidth();

    return (
        <div className='content'>
            <header className='content__header'>
                <MenuButton />
                <h1>Habits</h1>
                {width >= 768 && <Datepicker />}
            </header>
            <Habit />
            <Habit />
            <Habit />
            <Habit />
            <Habit />
        </div>
    );
};

export default Habits;
