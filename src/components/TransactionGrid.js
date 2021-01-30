import React, { useState } from 'react';
import TransactionGridRow from './TransactionGridRow'
import useFetch, { DEFAULT_OPTIONS } from '../Shared/useFetch';

const TransactionGrid = (props) => {
    const [fetchOptions, setFetchOptions] = useState(DEFAULT_OPTIONS);

    const [transactions, isLoading, error] = useFetch('/transactions', fetchOptions);
    const [stockList] = useFetch('stocks');

    const getPrice = (symbol)=> {
        const stock = stockList && stockList.find(stock=> stock.symbol === symbol);
        return stock && stock.lastTick.price;
    }

    if (error) {
        return <div>'Error: {error}'</div>
    } else if (isLoading) {
        return <div>Loading...</div>
    } else{

    return(
        <section className="stock-transactions full-width">
            <div className="stock-transactions__grid-row">
                <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text stock-transactions__grid-text--white">Transaction ID</span></div>
                <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text stock-transactions__grid-text--white">date</span></div>
                <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text stock-transactions__grid-text--white">stock</span></div>
                <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text stock-transactions__grid-text--white">amount</span></div>
                <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text stock-transactions__grid-text--white">direction</span></div>
                <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text stock-transactions__grid-text--white">price</span></div>
                <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text stock-transactions__grid-text--white">total</span></div>
            </div>
            {transactions && !props.symbol && transactions.map((transaction,i) => 
            <TransactionGridRow 
                key={transaction.symbol}
                id={i}
                symbol={transaction.symbol}
                date={transaction.date}
                amount={transaction.amount}
                price={getPrice(transaction.symbol)}
                direction={transaction.side}
                total={transaction.amount * getPrice(transaction.symbol)}
            />)}
            {transactions && props.symbol && transactions.filter(name => name.symbol === props.symbol).map((transaction,i) => 
            <TransactionGridRow 
                key={transaction.symbol}
                id={i}
                symbol={transaction.symbol}
                date={transaction.date}
                amount={transaction.amount}
                price={getPrice(transaction.symbol)}
                direction={transaction.side}
                total={transaction.amount * getPrice(transaction.symbol)}
            />)}
        </section>
    );
}
}

export default TransactionGrid;