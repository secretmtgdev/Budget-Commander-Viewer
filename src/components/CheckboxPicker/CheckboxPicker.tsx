import React from 'react';

import { useAppDispatch } from '../../redux/hooks';
import { addColor, removeColor, setIsGuild, setIsShard, setAreSingle, setIsFourColor } from '../../redux/colorSelectionSlice';
import './CheckboxPicker.css';
import { disableElementsByDataSet, enableElementsByDataSet, isGuild, isShard, isSingleColor } from '../../utils/Utils';
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
                    dispatch(setAreSingle(true));
                    disableElementsByDataSet(DATASET_TYPES.color, CARD_COLOR.guild, CARD_COLOR.shard, CARD_COLOR.fourColor);
                    break;
                case CARD_COLOR[CARD_COLOR.guild]:
                    dispatch(setIsGuild(true));
                    disableElementsByDataSet(DATASET_TYPES.color, CARD_COLOR.single, CARD_COLOR.shard, CARD_COLOR.fourColor);
                    break;
                case CARD_COLOR[CARD_COLOR.shard]:
                    dispatch(setIsShard(true));
                    disableElementsByDataSet(DATASET_TYPES.color, CARD_COLOR.single, CARD_COLOR.guild, CARD_COLOR.fourColor);
                    break;
                case CARD_COLOR[CARD_COLOR.fourColor]:
                    dispatch(setIsFourColor(true));
                    disableElementsByDataSet(DATASET_TYPES.color, CARD_COLOR.single, CARD_COLOR.guild, CARD_COLOR.shard);
                    break;
            }

            checkbox.parentElement?.classList.add('selected');
            dispatch(addColor(selectedColor));
        } else {
            switch (selectedColorType) {
                case CARD_COLOR[CARD_COLOR.single]:
                    dispatch(setAreSingle(false));
                    enableElementsByDataSet(DATASET_TYPES.color, CARD_COLOR.guild, CARD_COLOR.shard, CARD_COLOR.fourColor);
                    break;
                case CARD_COLOR[CARD_COLOR.guild]:
                    dispatch(setIsGuild(false));
                    enableElementsByDataSet(DATASET_TYPES.color, CARD_COLOR.single, CARD_COLOR.shard, CARD_COLOR.fourColor);
                    break;
                case CARD_COLOR[CARD_COLOR.shard]:
                    dispatch(setIsShard(false));
                    enableElementsByDataSet(DATASET_TYPES.color, CARD_COLOR.single, CARD_COLOR.guild, CARD_COLOR.fourColor);
                    break;
                case CARD_COLOR[CARD_COLOR.fourColor]:
                    dispatch(setIsFourColor(false));
                    enableElementsByDataSet(DATASET_TYPES.color, CARD_COLOR.single, CARD_COLOR.guild, CARD_COLOR.shard);
                    break;
            }

            checkbox.parentElement?.classList.remove('selected');
            dispatch(removeColor(selectedColor));
        }
    }

    return (
        <div role='group' className='grid'>
            {options.map(option => (
                <label key={option[0]} className='label-container'>{option[0]}
                    <input 
                        type='checkbox'
                        data-color-type={
                            isSingleColor(option[1]) ?
                                CARD_COLOR.single :
                                (isGuild(option[1]) ?
                                    CARD_COLOR.guild :
                                    (isShard(option[1]) ?
                                        CARD_COLOR.shard :
                                        CARD_COLOR.fourColor
                                    )
                                )
                        }
                        onClick={(checkbox) => handleChecked(checkbox.currentTarget)}
                        value={option[1]}/>
                </label>
            ))}
        </div>
    );
}

export default CheckboxPicker;