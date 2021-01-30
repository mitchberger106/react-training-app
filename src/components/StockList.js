import React, { useState } from 'react';
import StockListItem from './StockListItem';
import StockListHeader from './StockListHeader';
import useFetch, { DEFAULT_OPTIONS } from '../Shared/useFetch';
import HighChart from './HighChart';

const StockList = () => {
    const [fetchOptions, setFetchOptions] = useState(DEFAULT_OPTIONS);

    const [allocations, isLoading, error] = useFetch('/userdata/allocations', fetchOptions);

    const [stocks, isLoading1, error1] = useFetch('userdata/watchlist', fetchOptions);
    const [stockList] = useFetch('stocks');

    const [value, setValue] = React.useState(stockList != null ? stockList[0].symbol : "");

    const getPrice = (symbol) => {
        const stock = stockList && stockList.find(stock => stock.symbol === symbol);
        return stock && stock.lastTick.price;
    }

    const getAmount = (symbol) => {
        const stock = allocations && allocations.find(stock => stock.symbol === symbol);
        return stock && stock.amount;
    }

    const onStockRemoved = () => {
        setFetchOptions({ refresh: new Date().getMilliseconds() });
    }

    const onStockAdded = () => {
        setFetchOptions({ refresh: new Date().getMilliseconds() });
    }

    const onStockBought = () => {
        setFetchOptions({ refresh: new Date().getMilliseconds() });
    }

    const onStockSold = () => {
        setFetchOptions({ refresh: new Date().getMilliseconds() });
    }

    function handleChange(newValue) {
        setValue(newValue);
      }

    if (error || error1) {
        return <div>'Error: {error}'</div>
    } else if (isLoading || isLoading1) {
        return <div>Loading...</div>
    } else {

        return (
            <section>
                <div className="stock-list">
                    <StockListHeader onStockAdded={onStockAdded} />
                    <div className="stock-list__grid">
                        {stocks && stocks.map(stock => 
                        <StockListItem
                            value = {value}
                            onChange={handleChange}
                            onStockRemoved={onStockRemoved}
                            onStockBought={onStockBought}
                            onStockSold={onStockSold}
                            key={stock.symbol}
                            symbol={stock.symbol}
                            price={getPrice(stock.symbol)}
                            amount={getAmount(stock.symbol)}
                        />)}
                    </div>
                </div>
                <HighChart
                    symbol={value} />
            </section>
        );
    }
}

export default StockList;