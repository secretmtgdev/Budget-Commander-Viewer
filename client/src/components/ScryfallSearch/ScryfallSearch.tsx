import React from "react";
import { connect } from "react-redux";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllCardTypes, getAllMagicColors, mapStateToProps } from "../../utils/Utils";
import { getCardsByFilters } from "../../utils/Queries";
import PricePicker from "../PricePicker/PricePicker";
import { ClientLib } from "../../utils/Types";
import { setCardList, setNextCardListUrl } from "../../redux/cardListSlice";
import CardViewList from "../CardViewList/CardViewList";
import LoadMore from "../LoadMore/LoadMore";
import MagicColorPicker from "../CheckboxPicker/MagicColorPicker";
import MagicTypePicker from "../CheckboxPicker/MagicTypePicker";
import SearchByName from "../SearchBar/SearchByName";

import './ScryfallSearch.css';
import SearchByText from "../SearchBar/SearchByText";

const ScryfallSearch = () => {
    const dispatch = useAppDispatch();
    const colorSelection = useAppSelector(state => state.colorSelection);
    const priceSelection = useAppSelector(state => state.priceSelection);
    const cardSelection = useAppSelector(state => state.cardList);
    const textSelection = useAppSelector(state => state.searchQuery);
    const cardTypeSelection = useAppSelector(state => state.cardTypeSelection.cardTypes)
    const filterObject: ClientLib.IAllFilters = {
        colorCombinations: colorSelection,
        priceRange: {
            minPrice: priceSelection.minPrice,
            maxPrice: priceSelection.maxPrice
        },
        textFilter: textSelection,
        cardTypeSelection
    };

    return (
        <form id='scryfall-search'>
            <MagicColorPicker options={getAllMagicColors()}/>
            <MagicTypePicker options={getAllCardTypes()}/>
            <PricePicker />
            <SearchByName />
            <SearchByText />
            <button 
                type='button'
                onClick={async () => {
                    const [cards, nextCards] = await getCardsByFilters(filterObject);
                    dispatch(setCardList(cards));
                    dispatch(setNextCardListUrl(nextCards))
                }}>
                    Search
            </button>
            <CardViewList />
            {!!cardSelection.nextCardListUrl && <LoadMore />}
        </form>
    )
};

export default connect(mapStateToProps)(ScryfallSearch);