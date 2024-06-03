import React, { useState } from "react";

import { ScryfallLib } from "../../utils/Types";

import './CardViewRenderer.css';
import CardViewModal from "./CardViewModal";

const CardViewRenderer = (cardProps: ScryfallLib.ICard) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className='card-view-container'>
                <img
                    onClick={() => setShowModal(!showModal)}
                    src={cardProps.image_uris!.border_crop}
                    alt={cardProps.name} 
                />
            </div>
            {showModal && <CardViewModal {...cardProps} showModal={setShowModal} />}
        </>        
    )
}

export default CardViewRenderer;