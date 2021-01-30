import React, { useState } from 'react';
import StockAddModal from './StockAddModal';

const StockListHeader = (props) => {
    const [adding,setAdding] = useState(false);
    return(
        <h2 className="stock-list__title">
            Stocks that I follow
            <a>
                <span className="stock-list__btn stock-list__btn--add" onClick={()=>setAdding(true)}>+</span>
            </a>
            {adding && 
            <StockAddModal
            closeModal={() => {
                setAdding(false);
                props.onStockAdded && props.onStockAdded();
            }}
        />
    }
        </h2>
    );
}

export default StockListHeader;