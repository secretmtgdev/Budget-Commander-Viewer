import React from 'react';
import './CheckboxPicker.css';

export interface ICheckboxPicker {
    options: string[][]
}

const CheckboxPicker = ({options}: ICheckboxPicker) => {
    return (
        <div role='radiogroup'>
            {options.map(option => (
                <label key={option[0]} className='label-container'>{option[0]}
                    <input type='checkbox' value={option[1]}/>
                    <span className='checkmark'></span>
                </label>
            ))}
        </div>
    );
}

export default CheckboxPicker;