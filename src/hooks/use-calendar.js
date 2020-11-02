import { useState, useCallback, useEffect, useReducer } from 'react';

const calendarReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'UPDATE':
            const updatedState = [...state];
            updatedState.forEach((week) =>
                week.map((day) => {
                    if (day.day === +action.payload.day) {
                        day.checked = action.payload.state;
                    }
                    return day;
                })
            );
            return updatedState;
        default:
            return state;
    }
};

export const useCalendar = (startDate) => {
    const [date, setDate] = useState(startDate || new Date());
    const [monthData, dispatch] = useReducer(calendarReducer, []);

    const generateMonth = useCallback(
        (year, month, processedDays = 0, calendarData = []) => {
            // NOTE: new Date(year, month + 1, 0).getDate() returns the last day of previous month, so +1 to current month must be added
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            const weekData = [];

            // NOTE: generate empty cells at the beggining of the month
            // TODO: fill empty cells with days from previous month
            if (calendarData.length === 0) {
                const emptyCells =
                    new Date(year, month, 1).getDay() === 0
                        ? 6
                        : new Date(year, month, 1).getDay() - 1;

                for (let i = 0; i < emptyCells; i++) {
                    weekData.push('');
                }
            }

            for (let i = processedDays; i < daysInMonth; i++) {
                const dayOfWeek = new Date(year, month, i + 1).getDay();

                weekData.push({
                    day: i + 1,
                    dayOfWeek,
                    checked: false,
                });

                processedDays += 1;
                if (dayOfWeek === 0) {
                    break;
                }
            }
            calendarData.push(weekData);

            if (processedDays >= daysInMonth) {
                dispatch({ type: 'SET_DATA', payload: calendarData });
                return;
            }

            generateMonth(year, month, processedDays, calendarData);
        },
        []
    );

    const updateDay = (day, state) => {
        dispatch({ type: 'UPDATE', payload: { day, state } });
    };

    useEffect(() => {
        generateMonth(date.getFullYear(), date.getMonth());
    }, [generateMonth, date]);

    return { calendar: monthData, setDate, date, updateDay };
};
