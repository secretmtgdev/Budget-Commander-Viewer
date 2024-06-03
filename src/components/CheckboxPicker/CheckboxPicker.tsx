import React from 'react';

import './CheckboxPicker.css';
import { ClientLib } from '../../utils/Types';

export interface ICheckboxPicker {
    options: ClientLib.IPickerType[];
    handleChecked: (checkbox: HTMLInputElement) => void;
}

export const CheckboxPicker = ({options, handleChecked}: ICheckboxPicker) => {
    const handleFocus = (input: HTMLInputElement) => input.parentElement?.classList.add('focused');
    const handleBlur = (input: HTMLInputElement) => input.parentElement?.classList.remove('focused');
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const inputElement = event.currentTarget;
            inputElement.ariaSelected = inputElement.checked ? 'true' : 'false';
            inputElement.click();
        }
    }

    return (
        <div tabIndex={0} role='listbox' className='grid'>
            {options.map(option => (
                <label
                    tabIndex={1}
                    key={option.name}
                    className='label-container'>{option.name}
                    <input
                        role='option'
                        aria-selected='false'
                        onFocus={(e) => handleFocus(e.currentTarget)}
                        onBlur={(e) => handleBlur(e.currentTarget)}
                        type='checkbox'
                        onClick={(checkbox) => handleChecked(checkbox.currentTarget)}
                        onKeyDown={(e) => handleKeyPress(e)}
                        {...option.datasetInfo}
                        value={option.value}/>
                </label>
            ))}
        </div>            
    );
}

export default CheckboxPicker;