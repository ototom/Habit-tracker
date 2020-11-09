import React, { useState, useRef, useEffect } from 'react';
import './AddNewHabit.scss';

const AddNewHabit = () => {
    const [isFormActive, setIsFormActive] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef();

    const openFormHandler = () => setIsFormActive(true);
    const closeFormHandler = () => setIsFormActive(false);
    const inputChangeHandler = (e) => setInputValue(e.target.value);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!inputValue) {
            console.log('You must enter some text');
            return;
        }

        console.log(inputValue);
    };

    useEffect(() => {
        if (!isFormActive) {
            return;
        }

        inputRef.current.focus();
    }, [isFormActive]);

    return (
        <div className='add-new-habit'>
            {isFormActive ? (
                <form className='add-new-habit__form' onSubmit={submitHandler}>
                    <input
                        type='text'
                        placeholder='Enter habit name and hit enter'
                        ref={inputRef}
                        onChange={inputChangeHandler}
                    />
                    <button
                        type='submit'
                        className='add-new-habit__btn add-new-habit__btn--check'
                    >
                        <i className='fas fa-check'></i>
                    </button>
                    <button
                        type='button'
                        className='add-new-habit__btn add-new-habit__btn--close'
                        onClick={closeFormHandler}
                    >
                        <i className='fas fa-times'></i>
                    </button>
                </form>
            ) : (
                <>
                    <button
                        className='add-new-habit__toggle-btn'
                        onClick={openFormHandler}
                    >
                        Add new habit
                    </button>
                </>
            )}
        </div>
    );
};

export default AddNewHabit;
