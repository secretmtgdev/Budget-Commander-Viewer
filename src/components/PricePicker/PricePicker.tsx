import React from 'react';

import './PricePicker.css';
import { useAppDispatch } from '../../redux/hooks';
import { setMaxPrice, setMinPrice } from '../../redux/priceSelectionSlice';

const PricePicker = () => {
    const dispatch = useAppDispatch();
    const prices = Array.from({ length: Math.ceil(100) }, (_, i) => i);
    return (
        <div className='price-picker-container'>
            <label htmlFor='prices'>Price range</label>
            <select 
                onChange={e => dispatch(setMinPrice(parseInt(e.target.value)))}
                name='min-price'>
                {prices.map(price => 
                    <option value={price}>{price}</option>
                )}
            </select>
            -
            <select
                onChange={e => dispatch(setMaxPrice(parseInt(e.target.value)))}
                name='max-price'>
                {prices.map(price => 
                    <option value={price}>{price}</option>
                )}
            </select>
        </div>
    )
}

export default PricePicker