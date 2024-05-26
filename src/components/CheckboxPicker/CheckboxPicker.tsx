import React from 'react';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { addColor, removeColor } from '../../redux/colorSelectionSlice';
import './CheckboxPicker.css';
import { disableElementsByDataSet, isGuild, isShard, isSingleColor } from '../../utils/Utils';
import { CARD_COLOR, DATASET_TYPES } from '../../utils/MagicConstants';
import { AppDispatch } from '../../redux/Store';

export interface ICheckboxPicker {
    dispatch: AppDispatch;
    options: string[][];
}

function CheckBoxPickerWrapper(WrappedComponent: any) {
    return function(props: any) {
        const dispatch = useAppDispatch();
        return (
            <WrappedComponent dispatch={dispatch} {...props} />
        )
    }
}

export class CheckboxPicker extends React.Component<ICheckboxPicker> {
    private dispatch;
    private options;

    constructor(props: ICheckboxPicker) {
        super(props);
        this.options = props.options;
        this.dispatch = props.dispatch;
    }

    private handleChecked(checkbox: HTMLInputElement) {
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
            this.dispatch(addColor(selectedColor));
        } else {
            this.dispatch(removeColor(selectedColor));
        }
    }

    public render() {
        return (
            <div role='radiogroup'>
                {this.options.map(option => (
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
                            onClick={(checkbox) => this.handleChecked(checkbox.currentTarget)}
                            value={option[1]}/>
                        <span className='checkmark'></span>
                    </label>
                ))}
            </div>
        );
    }
}

export default CheckBoxPickerWrapper(CheckboxPicker);