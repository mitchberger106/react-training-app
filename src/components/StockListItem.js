import React, { useState } from 'react';
import { PropertyKeys } from 'ag-grid-community';
import useFetch from '../Shared/useFetch';
import { baseURL, getUserId } from '../Shared/useFetch';
import StockRemoveItem from './StockRemoveItem';
import BuyModal from './BuyModal';
import SellModal from './SellModal';

const StockListItem = (props) => {
    const [buying, setBuying] = useState(false);
    const [selling, setSelling] = useState(false);

    function handleChange(event) {
        // Here, we invoke the callback with the new value
        props.onChange(props.symbol);
    }

    return (
        <div className="stock-list__grid-row">
            {!props.noRemove && < StockRemoveItem key={props.symbol} symbol={props.symbol}
                onStockRemoved={() => {
                    props.onStockRemoved && props.onStockRemoved();
                }
                } />}
            <div className="stock-list__grid-cell" onClick={handleChange}>{props.symbol}</div>
            <div className="stock-list__grid-cell">{props.price && props.price.toFixed(2)}</div>
            <div className="stock-list__grid-cell">
                <a><span className="btn-transaction btn-transaction--buy" onClick={() => setBuying(true)}>buy</span></a>
                {buying &&
                    <BuyModal
                        symbol={props.symbol}
                        closeModal={() => {
                            setBuying(false);
                            props.onStockBought && props.onStockBought();
                        }}
                    />
                }
            </div>
            <div className="stock-list__grid-cell">
                {props.amount && <a><span className="btn-transaction btn-transaction--sell" onClick={() => setSelling(true)}>sell</span></a>}
                {selling &&
                    <SellModal
                        symbol={props.symbol}
                        closeModal={() => {
                            setSelling(false);
                            props.onStockSold && props.onStockSold();
                        }}
                    />
                }
            </div>
            <div class="stock-list__grid-cell">{props.amount}</div>
        </div>
    );
}


export default StockListItem;