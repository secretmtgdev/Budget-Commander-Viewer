import React from 'react';

import './PricePicker.css';
import { useAppDispatch } from '../../redux/hooks';
import { setMaxPrice, setMinPrice } from '../../redux/priceSelectionSlice';

const PricePicker = () => {
    const dispatch = useAppDispatch();
    return (
        <div className='price-picker-container'>
            <label htmlFor='prices'>Price range</label>
            <input 
                onChange={e => dispatch(setMinPrice(parseFloat(e.target.value)))}
                name='min-price'
                type='number' />
            -
            <input
                onChange={e => dispatch(setMaxPrice(parseFloat(e.target.value)))}
                name='max-price'
                type='number' />
        </div>
    )
}

export default PricePicker