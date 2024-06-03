import React from 'react';
import { connect } from 'react-redux';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addColor, removeColor, setIsGuild, setIsShard, setAreSingle, setIsFourColor, setNoOtherColors } from '../../redux/colorSelectionSlice';
import { 
    disableElementsByDataSet,
    disableOtherDatasetElements,
    enableAllDatasetElements,
    enableElementsByDataSet,
    mapStateToProps 
} from '../../utils/Utils';
import { CARD_COLOR } from '../../utils/MagicConstants';
import { DATASET_TYPES } from '../../utils/Constants';
import CheckboxPicker from './CheckboxPicker';
import { ClientLib } from '../../utils/Types';

export interface IMagicColorPicker {
    options: ClientLib.IPickerType[];
}

export const MagicColorPicker = ({options}: IMagicColorPicker) => {
    const dispatch = useAppDispatch();
    const noOtherColors = useAppSelector(state => state.colorSelection.noOtherColors);
    const handleColorChecked = (checkbox: HTMLInputElement) => {        
        // if single colors are selected, disable all other options
        const selectedColor = checkbox.value;
        const colorType = checkbox.dataset.colorType;
        const selectedColorType = colorType ? (CARD_COLOR[colorType as keyof typeof CARD_COLOR]).toString() : '';
        if (noOtherColors) {
            if (checkbox.checked) {
                disableOtherDatasetElements(checkbox, DATASET_TYPES.color);
                switch (selectedColorType) {
                    case CARD_COLOR[CARD_COLOR.single]:
                        dispatch(setAreSingle(true));
                        break;
                    case CARD_COLOR[CARD_COLOR.guild]:
                        dispatch(setIsGuild(true));
                        break;
                    case CARD_COLOR[CARD_COLOR.shard]:
                        dispatch(setIsShard(true));
                        break;
                    case CARD_COLOR[CARD_COLOR.fourColor]:
                        dispatch(setIsFourColor(true));
                        break;
                }

                checkbox.parentElement?.classList.add('selected');
                dispatch(addColor(selectedColor));
            } else {
                enableAllDatasetElements(DATASET_TYPES.color);
                switch (selectedColorType) {
                    case CARD_COLOR[CARD_COLOR.single]:
                        dispatch(setAreSingle(false));
                        break;
                    case CARD_COLOR[CARD_COLOR.guild]:
                        dispatch(setIsGuild(false));
                        break;
                    case CARD_COLOR[CARD_COLOR.shard]:
                        dispatch(setIsShard(false));
                        break;
                    case CARD_COLOR[CARD_COLOR.fourColor]:
                        dispatch(setIsFourColor(false));
                        break;
                }
    
                checkbox.parentElement?.classList.remove('selected');
                dispatch(removeColor(selectedColor));
            }
        } else {
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
    }

    return (
        <>
            <div>
                <label htmlFor='no-other-colors'>No other colors</label>
                <input name='no-other-colors' type='checkbox' onClick={() => dispatch(setNoOtherColors(!noOtherColors))} />
            </div>
            <CheckboxPicker options={options} handleChecked={handleColorChecked}/>
        </>
    );
}

export default connect(mapStateToProps)(MagicColorPicker);