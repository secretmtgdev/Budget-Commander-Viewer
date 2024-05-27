import React from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllMagicColors } from "../../utils/Utils";
import { getCardsByColors, getCardsByFilters } from "../../utils/Queries";
import CheckBoxPickerWrapper from "../CheckboxPicker/CheckboxPicker";
import PricePicker from "../PricePicker/PricePicker";
import { ClientLib } from "../../utils/Types";
import { setCardList } from "../../redux/cardListSlice";

const ScryfallSearch = () => {
    const dispatch = useAppDispatch();
    const colorSelection = useAppSelector(state => state.colorSelection.value);
    const priceSelection = useAppSelector(state => state.priceSelection);
    const filterObject: ClientLib.IAllFilters = {
        colors: colorSelection,
        priceRange: {
            minPrice: priceSelection.minPrice,
            maxPrice: priceSelection.maxPrice
        }
    };
    return (
        <>
            <CheckBoxPickerWrapper options={getAllMagicColors()}/>
            <PricePicker />
            <button onClick={async () => {
                const cards = await getCardsByFilters(filterObject);
                dispatch(setCardList(cards));
            }}>Search</button>
        </>
    )
};

export default ScryfallSearch;