import React from 'react';

const TransactionGridRow = (props) => {
    return(
        <div className="stock-transactions__grid-row">
            <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text">{props.id}</span></div>
            <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text">{props.date}</span></div>
            <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text">{props.symbol}</span></div>
            <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text">{props.amount}</span></div>
            <div className="stock-transactions__grid-cell"><span className={"stock-transactions__grid-text stock-transactions__grid-cell-" + (props.direction === 'SELL' ? 'sell' : 'buy')}>{props.direction}</span></div>
            <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text">{props.price}</span></div>
            <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text">{props.total}</span></div>
        </div>
    );
}

export default TransactionGridRow;