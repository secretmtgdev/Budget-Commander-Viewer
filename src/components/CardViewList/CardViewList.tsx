import React from "react";
import { connect } from "react-redux";

import CardViewRenderer from "../CardViewRenderer/CardViewRenderer";
import { mapStateToProps } from "../../utils/Utils";
import { ScryfallLib } from "../../utils/Types";
import './CardViewList.css';

const CardViewList = (props: any) => {
    return (
        <div className='card-view-list-flex'>
            <div className='card-view-list-grid'>
                {props?.cardList?.cards?.length > 0 
                    && props.cardList?.cards
                        ?.filter((card: ScryfallLib.ICard) => !!card.image_uris)
                        .map((card: ScryfallLib.ICard) => <CardViewRenderer key={Date.now() * Math.random()} {...card} />)
                }
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(CardViewList);