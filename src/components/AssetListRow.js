import React, { useState } from 'react';
import SellModal from './SellModal'

const AssetListRow = (props) => {
    const [selling, setSelling] = useState(false);
    return(
        <div className="stock-transactions__grid-row">
            <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text">{props.symbol}</span></div>
            <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text">{props.amount}</span></div>
            <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text">{props.price}</span></div>
            <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text">{props.total}</span></div>
            <div className="stock-transactions__grid-cell center">
                <a><span className="btn-transaction btn-transaction--sell" onClick={() => setSelling(true)}>sell</span></a>
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
        </div>
    );
}
export default AssetListRow;