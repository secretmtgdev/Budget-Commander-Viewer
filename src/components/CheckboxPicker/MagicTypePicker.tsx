import React from 'react';
import { connect } from 'react-redux';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { 
    disableOtherDatasetElements,
    enableAllDatasetElements,
    mapStateToProps 
} from '../../utils/Utils';
import CheckboxPicker from './CheckboxPicker';
import { ClientLib } from '../../utils/Types';
import { addCardType, removeCardType, setNoOtherCardTypes } from '../../redux/cardTypeSelectionSlice';
import { DATASET_TYPES } from '../../utils/Constants';

export interface MagicTypePicker {
    options: ClientLib.IPickerType[];
}

export const MagicColorPicker = ({options}: MagicTypePicker) => {
    const dispatch = useAppDispatch();
    const noOtherCardTypes = useAppSelector(state => state.cardTypeSelection.noOtherCardTypes);
    const handleCardTypeChecked = (checkbox: HTMLInputElement) => {
        if (checkbox.checked) {
            dispatch(addCardType(checkbox.value));
            if (noOtherCardTypes) {
                disableOtherDatasetElements(checkbox, DATASET_TYPES.type);
            }
            
            checkbox.parentElement?.classList.add('selected');
        } else {
            dispatch(removeCardType(checkbox.value));
            enableAllDatasetElements(DATASET_TYPES.type);
            checkbox.parentElement?.classList.remove('selected');
        }    
    }

    return (
        <>
            <div>
                <label htmlFor='no-other-colors'>No other types</label>
                <input name='no-other-colors' type='checkbox' onClick={() => dispatch(setNoOtherCardTypes(!noOtherCardTypes))}/>
            </div>
            <CheckboxPicker options={options} handleChecked={handleCardTypeChecked}/>
        </>
    );
}

export default connect(mapStateToProps)(MagicColorPicker);