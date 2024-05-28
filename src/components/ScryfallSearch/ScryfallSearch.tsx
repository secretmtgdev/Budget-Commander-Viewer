import React from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllMagicColors, mapStateToProps } from "../../utils/Utils";
import { getCardsByFilters } from "../../utils/Queries";
import CheckBoxPickerWrapper from "../CheckboxPicker/CheckboxPicker";
import PricePicker from "../PricePicker/PricePicker";
import { ClientLib } from "../../utils/Types";
import { setCardList, setNextCardListUrl } from "../../redux/cardListSlice";
import CardViewList from "../CardViewList/CardViewList";
import { connect } from "react-redux";

const ScryfallSearch = () => {
    const dispatch = useAppDispatch();
    const colorSelection = useAppSelector(state => state.colorSelection);
    const priceSelection = useAppSelector(state => state.priceSelection);
    const filterObject: ClientLib.IAllFilters = {
        colorCombinations: colorSelection,
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
                const [cards, nextCards] = await getCardsByFilters(filterObject);
                dispatch(setCardList(cards));
                dispatch(setNextCardListUrl(nextCards))
            }}>Search</button>
            <CardViewList />
        </>
    )
};

export default connect(mapStateToProps)(ScryfallSearch);