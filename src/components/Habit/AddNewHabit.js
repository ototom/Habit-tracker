import React, { useState, useRef, useEffect } from 'react';
import { useContext } from 'react';
import { authContext } from '../../context/auth-context';
import './AddNewHabit.scss';
import { success, danger } from '../shared/Notification';
import { dataContext } from '../../context/data-context';
import { useRequest } from '../../hooks/use-request';

const AddNewHabit = () => {
    const { token } = useContext(authContext);
    const { dispatch } = useContext(dataContext);
    const [isFormActive, setIsFormActive] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef();
    const { sendRequest } = useRequest(false);

    const openFormHandler = () => setIsFormActive(true);
    const closeFormHandler = () => setIsFormActive(false);
    const inputChangeHandler = (e) => setInputValue(e.target.value);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!inputValue) {
            danger('Habit name field must not be empty', true);
            return;
        }

        try {
            const data = await sendRequest('habit/add', {
                body: { name: inputValue },
                token,
                method: 'POST',
            });

            success(data.message, true);
            setInputValue('');
            dispatch({
                value: 'ADD',
                payload: { ...data.habit },
            });
        } catch (error) {}
    };

    useEffect(() => {
        if (!isFormActive) {
            return;
        }

        inputRef.current.focus();
    }, [isFormActive]);

    return (
        <div
            className={`add-new-habit ${
                isFormActive ? 'add-new-habit--active' : ''
            }`}
        >
            {isFormActive ? (
                <form className='add-new-habit__form' onSubmit={submitHandler}>
                    <input
                        type='text'
                        placeholder='Enter habit name and hit enter'
                        ref={inputRef}
                        name='name'
                        id='name'
                        value={inputValue}
                        onChange={inputChangeHandler}
                    />
                    <div className='add-new-habit__controlls'>
                        <button
                            type='submit'
                            className='add-new-habit__btn add-new-habit__btn--check'
                        >
                            Add
                        </button>
                        <button
                            type='button'
                            className='add-new-habit__btn add-new-habit__btn--close'
                            onClick={closeFormHandler}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    className='add-new-habit__toggle-btn'
                    onClick={openFormHandler}
                >
                    Add new habit
                </button>
            )}
        </div>
    );
};

export default AddNewHabit;
