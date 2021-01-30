import React from 'react';
import { PropertyKeys } from 'ag-grid-community';
import useFetch from '../Shared/useFetch';
import {baseURL, getUserId} from '../Shared/useFetch';

const StockRemoveItem = (props) => {
    const removeStock = async () => {
        const symbol = props.symbol;
        const data = {symbol, action: 'REMOVE'};
        const options = {method: 'POST',
         headers: { userId: getUserId(), 'Content-Type': 'application/json' }, 
         body: JSON.stringify(data)};
        const response = await fetch(`${baseURL}userdata/watchlist`, options);
        props.onStockRemoved && props.onStockRemoved();
    }
    return(
        <div className="stock-list__grid-cell">
            <a>
                <span className="stock-list__btn stock-list__btn--remove" onClick={removeStock}>-</span>
            </a>
        </div>
    );
}


export default StockRemoveItem;