import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Badge from '../shared/Badge/Badge';
import Button from '../shared/Button/Button';
import Input from '../shared/Input/Input';
import Modal from '../shared/Modal/Modal';
import { danger, info } from '../shared/Notification';
import { useRequest } from '../../hooks/use-request';

const EditModal = ({
    isActive,
    closeModal,
    token,
    dispatch,
    habitId,
    habit,
}) => {
    const [inputValue, setInputValue] = useState('');
    const { sendRequest, setIsLoading } = useRequest(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!inputValue) {
            danger('Input value must not be empty', true);
            return;
        }

        try {
            const data = await sendRequest(`habit/${habitId}`, {
                method: 'PATCH',
                token,
                body: { name: inputValue },
            });

            info(data.message, true);
            dispatch({
                value: 'CHANGE_NAME',
                payload: { habitId, name: inputValue },
            });
            setIsLoading(false);
        } catch (error) {}
    };

    useEffect(() => {
        setInputValue(habit.name);
    }, [habit, isActive]);

    const inputChangeHandler = (e) => setInputValue(e.target.value);

    return (
        <Modal isActive={isActive} closeModal={closeModal}>
            <div className='modal__header'>
                <h2>Edit your habit</h2>
            </div>
            <div className='modal__content modal__content--v-center'>
                <form onSubmit={submitHandler}>
                    <Input
                        label='Name'
                        id='name'
                        name='name'
                        value={inputValue}
                        onChange={inputChangeHandler}
                    />
                    <div className='align-right'>
                        <Button type='submit' className='btn--info'>
                            Save
                        </Button>
                    </div>
                </form>
            </div>
            <div className='modal__footer align-right'>
                Danger zone <Badge>Soon!</Badge> :
                <Button
                    className='btn--small btn--danger margin-left-1'
                    disabled
                >
                    Clear habit data
                </Button>
            </div>
        </Modal>
    );
};

EditModal.propTypes = {
    isActive: PropTypes.bool,
    closeModal: PropTypes.func,
    token: PropTypes.string,
    dispatch: PropTypes.func,
    habitId: PropTypes.string,
    habit: PropTypes.object,
};

export default EditModal;
