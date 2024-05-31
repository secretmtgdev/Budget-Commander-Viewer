import React from 'react';

import './CheckboxPicker.css';
import { ClientLib } from '../../utils/Types';

export interface ICheckboxPicker {
    options: ClientLib.IPickerType[];
    handleChecked: (checkbox: HTMLInputElement) => void;
}

export const CheckboxPicker = ({options, handleChecked}: ICheckboxPicker) => {
    return (
        <>
            <div role='group' className='grid'>
                {options.map(option => (
                    <label key={option.name} className='label-container'>{option.name}
                        <input 
                            type='checkbox'
                            onClick={(checkbox) => handleChecked(checkbox.currentTarget)}
                            {...option.datasetInfo}
                            value={option.value}/>
                    </label>
                ))}
            </div>            
        </>
    );
}

export default CheckboxPicker;