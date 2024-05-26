import React from "react";

import { useAppSelector } from "../../redux/hooks";
import { getAllMagicColors } from "../../utils/Utils";
import CheckboxPicker from "../CheckboxPicker/CheckboxPicker";
import { getCardsByColors } from "../../utils/Queries";

const ScryfallSearch = () => {
    const colorSelection = useAppSelector(state => state.colorSelection.value);
    return (
        <>
            <CheckboxPicker options={getAllMagicColors()}/>
            <button onClick={() => getCardsByColors(colorSelection)}>Search</button>
        </>
    )
};

export default ScryfallSearch;