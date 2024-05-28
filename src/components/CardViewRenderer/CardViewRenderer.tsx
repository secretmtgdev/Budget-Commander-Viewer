import React from "react";

import { ScryfallLib } from "../../utils/Types";
import './CardViewRenderer.css';

const CardViewRenderer = ({ image_uris, name }: ScryfallLib.ICard) => {
    return (
        <div className='card-view-container'>
            <img src={image_uris!.border_crop} alt={name} />
        </div>
    )
}

export default CardViewRenderer;