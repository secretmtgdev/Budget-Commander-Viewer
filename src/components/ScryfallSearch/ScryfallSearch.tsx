import React from "react";

import { useAppSelector } from "../../redux/hooks";
import { getAllMagicColors } from "../../utils/Utils";
import { getCardsByColors } from "../../utils/Queries";
import CheckBoxPickerWrapper from "../CheckboxPicker/CheckboxPicker";

const ScryfallSearch = () => {
    const colorSelection = useAppSelector(state => state.colorSelection.value);
    return (
        <>
            <CheckBoxPickerWrapper options={getAllMagicColors()}/>
            <button onClick={() => getCardsByColors(colorSelection)}>Search</button>
        </>
    )
};

export default ScryfallSearch;