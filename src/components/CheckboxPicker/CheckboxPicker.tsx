import React from 'react';

import { useAppDispatch } from '../../redux/hooks';
import { addColor, removeColor } from '../../redux/colorSelectionSlice';
import './CheckboxPicker.css';
import { disableElementsByDataSet, isGuild, isSingleColor } from '../../utils/Utils';
import { CARD_COLOR, DATASET_TYPES } from '../../utils/MagicConstants';

export interface ICheckboxPicker {
    options: string[][];
}

export const CheckboxPicker = ({options}: ICheckboxPicker) => {
    const dispatch = useAppDispatch();
    const handleChecked = (checkbox: HTMLInputElement) => {
        // if single colors are selected, disable all other options
        const selectedColor = checkbox.value;

        const colorType = checkbox.dataset.colorType;
        const selectedColorType = colorType ? (CARD_COLOR[colorType as keyof typeof CARD_COLOR]).toString() : '';
        if (checkbox.checked) {
            switch (selectedColorType) {
                case CARD_COLOR[CARD_COLOR.single]:
                    disableElementsByDataSet(DATASET_TYPES.color, CARD_COLOR.guild, CARD_COLOR.shard);
                    break;
                case CARD_COLOR[CARD_COLOR.guild]:
                    disableElementsByDataSet(DATASET_TYPES.color, CARD_COLOR.single, CARD_COLOR.shard);
                    break;
                case CARD_COLOR[CARD_COLOR.shard]:
                    disableElementsByDataSet(DATASET_TYPES.color, CARD_COLOR.single, CARD_COLOR.guild);
                    break;
            }
        }

        if (checkbox.checked) {
            dispatch(addColor(selectedColor));
        } else {
            dispatch(removeColor(selectedColor));
        }
    }

    return (
        <div role='radiogroup'>
            {options.map(option => (
                <label key={option[0]} className='label-container'>{option[0]}
                    <input 
                        type='checkbox'
                        data-color-type={
                            isSingleColor(option[1]) ?
                                CARD_COLOR.single :
                                (isGuild(option[1]) ?
                                    CARD_COLOR.guild :
                                    CARD_COLOR.shard)
                        }
                        onClick={(checkbox) => handleChecked(checkbox.currentTarget)}
                        value={option[1]}/>
                    <span className='checkmark'></span>
                </label>
            ))}
        </div>
    );
}

export default CheckboxPicker;