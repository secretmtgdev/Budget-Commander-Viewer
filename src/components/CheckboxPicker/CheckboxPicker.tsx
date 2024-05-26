import React from 'react';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { addColor, removeColor } from '../../redux/colorSelectionSlice';
import './CheckboxPicker.css';
import { isGuild, isShard, isSingleColor } from '../../utils/Utils';
import { CARD_COLOR } from '../../utils/MagicConstants';

export interface ICheckboxPicker {
    options: string[][]
}

const disableColors = (...colors: CARD_COLOR[]) => {
    const colorInputs = document.querySelectorAll<HTMLInputElement>('[data-color-type]');
    Array.from(colorInputs)
        .filter(colorInput => {
            const colorType = colorInput.getAttribute('data-color-type');
            return colors.indexOf(parseInt(colorType!.valueOf())) >= 0;
        })
        .forEach(colorInput => {
            colorInput.disabled = true;
            colorInput.parentElement?.classList.add('disabled');
        })
};

const CheckboxPicker = ({options}: ICheckboxPicker) => {
    const dispatch = useAppDispatch();    
    const handleChecked = (checkbox: HTMLInputElement) => {
        // if single colors are selected, disable all other options
        const selectedColor = checkbox.value;

        const colorType = checkbox.dataset.colorType;
        const selectedColorType = colorType ? (CARD_COLOR[colorType as keyof typeof CARD_COLOR]).toString() : '';
        if (checkbox.checked) {
            switch (selectedColorType) {
                case CARD_COLOR[CARD_COLOR.single]:
                    disableColors(CARD_COLOR.guild, CARD_COLOR.shard);
                    break;
                case CARD_COLOR[CARD_COLOR.guild]:
                    disableColors(CARD_COLOR.single, CARD_COLOR.shard);
                    break;
                case CARD_COLOR[CARD_COLOR.shard]:
                    disableColors(CARD_COLOR.single, CARD_COLOR.guild);
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
                    <input type='checkbox' data-color-type={isSingleColor(option[1]) ? CARD_COLOR.single : (isGuild(option[1]) ? CARD_COLOR.guild : CARD_COLOR.shard)} onClick={(checkbox) => handleChecked(checkbox.currentTarget)} value={option[1]}/>
                    <span className='checkmark'></span>
                </label>
            ))}
        </div>
    );
}

export default CheckboxPicker;