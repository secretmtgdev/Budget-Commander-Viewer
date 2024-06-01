import React from 'react';
import { FaRegCircleXmark } from 'react-icons/fa6';

import './CardViewModal.css';
import { ScryfallLib } from '../../utils/Types';

export interface ICardViewModalProps extends ScryfallLib.ICard {
    showModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardViewModal = (cardModalProps: ICardViewModalProps) => {
    return(
        <div className='card-view-modal-container'>
            <div className='header'>
                <div className='header-left'>
                    <span>Artist - {cardModalProps.artist}</span>
                    <span>Rarity - {cardModalProps.rarity}</span>
                    <span>Release date - {cardModalProps.released_at}</span>
                </div>
                <div className='header-center'>
                    <h1>{cardModalProps.name}</h1>
                </div>
                <div className='header-right'>
                    <FaRegCircleXmark className='close' onClick={() => cardModalProps.showModal(false)} />
                </div>
            </div>
            <div className='modal-content'>
                <div>
                    <img src={cardModalProps.image_uris?.art_crop} alt={cardModalProps.name}/>
                </div>
                
                {/* TODO: Possibly extract this into its own component and clean up */}
                <div className='modal-prices'>
                    {Object.entries(cardModalProps.prices)
                        .map((currency, price) => <span>{currency} - {price}</span>)}
                </div>
            </div>
        </div>
    )
}

export default CardViewModal;