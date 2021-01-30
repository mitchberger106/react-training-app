import React, { useState } from 'react';
import AssetListRow from './AssetListRow'
import useFetch, { DEFAULT_OPTIONS } from '../Shared/useFetch';

const AssetList = () => {
    const [fetchOptions, setFetchOptions] = useState(DEFAULT_OPTIONS);

    const [allocations, isLoading, error] = useFetch('/userdata/allocations', fetchOptions);
    const [liquidity] = useFetch('/userdata/liquidity');
    const [stockList] = useFetch('stocks');

    const getPrice = (symbol) => {
        const stock = stockList && stockList.find(stock => stock.symbol === symbol);
        return stock && stock.lastTick.price;
    }

    if (error) {
        return <div>'Error: {error}'</div>
    } else if (isLoading) {
        return <div>Loading...</div>
    } else {
        return (
            <section className="stock-transactions full-width">
                <div className="stock-transactions__grid-row">
                    <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text stock-transactions__grid-text--white">stock</span></div>
                    <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text stock-transactions__grid-text--white">amount</span></div>
                    <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text stock-transactions__grid-text--white">current price</span></div>
                    <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text stock-transactions__grid-text--white">total</span></div>
                    <div className="stock-transactions__grid-cell"></div>
                </div>
                {allocations && allocations.map((allocation) => <AssetListRow
                    key={allocation.symbol}
                    symbol={allocation.symbol}
                    amount={allocation.amount}
                    price={getPrice(allocation.symbol)}
                    total={allocation.amount * getPrice(allocation.symbol)}
                />)}
            <div className="stock-transactions__grid-row">
                <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text">Liquidity</span></div>
                <div className="stock-transactions__grid-cell"><span className="stock-transactions__grid-text">{liquidity}</span></div>
            </div>
            </section>
        );
    }
}
export default AssetList;