import { useReducer, useEffect, useCallback } from 'react';
import { isSameDay, isSameMonth, parseISO } from 'date-fns';
import { useRequest } from './use-request';

const dataReducer = (state, action) => {
    switch (action.value) {
        case 'SET': {
            return { habits: action.payload };
        }
        case 'ADD': {
            return { habits: [...state.habits, action.payload] };
        }
        case 'DELETE': {
            const updatedHabits = state.habits.filter(
                (el) => el._id !== action.payload
            );
            return { ...state, habits: updatedHabits };
        }
        case 'UPDATE': {
            let habits = [...state.habits];
            const index = habits.findIndex(
                (habit) => habit._id === action.payload.habitId
            );

            const updatedDays = [...habits[index].checkedDays];

            const dayIndex = updatedDays.findIndex((day) =>
                isSameDay(parseISO(day.date), parseISO(action.payload.date))
            );

            if (dayIndex === -1) {
                updatedDays.push({ date: action.payload.date });
            } else {
                updatedDays.splice(dayIndex, 1);
            }

            habits[index].checkedDays = [...updatedDays];

            return { ...state, habits: [...habits] };
        }
        case 'CHANGE_NAME': {
            const updatedHabits = [...state.habits];
            const index = updatedHabits.findIndex(
                (habit) => habit._id === action.payload.habitId
            );

            updatedHabits[index].name = action.payload.name;
            return { ...state, habits: [...updatedHabits] };
        }
        default:
            return state;
    }
};

export const useData = (token) => {
    const [data, dispatch] = useReducer(dataReducer, { habits: [] });
    const { sendRequest, isLoading, setIsLoading } = useRequest(true);

    useEffect(() => {
        if (!token) {
            return;
        }

        const fetchData = async () => {
            try {
                const data = await sendRequest('habit', { token, headers: {} });
                dispatch({ value: 'SET', payload: data.habits });
                setIsLoading(false);
            } catch (error) {}
        };

        fetchData();
    }, [token, sendRequest, setIsLoading]);

    const getSummary = useCallback(
        (id, date = new Date()) => {
            const habit = data.habits.filter((habit) => habit._id === id);

            const currentMonth = habit[0].checkedDays.filter((day) =>
                isSameMonth(parseISO(day.date), new Date())
            );

            const selectedMonth = habit[0].checkedDays.filter((day) =>
                isSameMonth(parseISO(day.date), date)
            );
            return {
                total: habit[0].checkedDays.length,
                currentMonth: currentMonth.length,
                selectedMonth: selectedMonth.length,
            };
        },
        [data]
    );

    return { data, getSummary, dispatch, isLoading };
};
