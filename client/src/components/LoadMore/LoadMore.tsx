import React from "react";
import { connect } from "react-redux";

import { mapStateToProps } from "../../utils/Utils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCardsByEndpoint } from "../../utils/Queries";
import { setCardList, setNextCardListUrl } from "../../redux/cardListSlice";

import './LoadMore.css';

const LoadMore = () => {
    const dispatch = useAppDispatch();
    const cardSelection = useAppSelector(state => state.cardList);
    const getNextCardList = async() => {
        const curCards = cardSelection.cards;
        const [cards, nextCards] = await getCardsByEndpoint(cardSelection.nextCardListUrl);
        dispatch(setCardList([...curCards, ...cards]));
        dispatch(setNextCardListUrl(nextCards))
    }
    return (
        <div className='load-more-container'>
            <button onClick={getNextCardList}>Load more</button>
        </div>
    )    
}

export default connect(mapStateToProps)(LoadMore);