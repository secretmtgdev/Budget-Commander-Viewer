import React from 'react';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { addColor, removeColor } from '../../redux/colorSelectionSlice';
import './CheckboxPicker.css';

export interface ICheckboxPicker {
    options: string[][]
}

const CheckboxPicker = ({options}: ICheckboxPicker) => {
    const dispatch = useAppDispatch();
    const handleChecked = (checkbox: HTMLInputElement) => {
        if (checkbox.checked) {
            dispatch(addColor(checkbox.value));
        } else {
            dispatch(removeColor(checkbox.value));
        }
    }
    return (
        <div role='radiogroup'>
            {options.map(option => (
                <label key={option[0]} className='label-container'>{option[0]}
                    <input type='checkbox' onChange={(checkbox) => handleChecked(checkbox.currentTarget)} value={option[1]}/>
                    <span className='checkmark'></span>
                </label>
            ))}
        </div>
    );
}

export default CheckboxPicker;