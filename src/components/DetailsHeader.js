import React from 'react';
import useFetch from '../Shared/useFetch';
import StockListItem from './StockListItem'
import HighChart from './HighChart'
import TransactionGrid from './TransactionGrid'

const DetailsHeader = (props) => {
    const [stocks] = useFetch('stocks');
    const [value, setValue] = React.useState("ACME");


    const [allocations] = useFetch('/userdata/allocations');

    const getPrice = (symbol) => {
        const stock = stocks && stocks.find(stock => stock.symbol === symbol);
        return stock && stock.lastTick.price;
    }

    const getAmount = (symbol) => {
        const stock = allocations && allocations.find(stock => stock.symbol === symbol);
        return stock && stock.amount;
    }

    return (
        <section>
            <div class="stock-list__grid">
                <select
                    id="stocksToShowDetails"
                    value={value}
                    class="dropdown"
                    onChange={e => setValue(e.target.value)} >
                    {stocks && stocks.map(stock =>
                        <option key={stock.symbol} value={stock.symbol}>{`${stock.symbol}`}</option>)
                    }
                </select>
                <StockListItem
                    noRemove="true"
                    symbol={value}
                    price={getPrice(value)}
                    amount={getAmount(value)}
                />
            </div>
            <HighChart
                full='yes'
                symbol={value} />
            <TransactionGrid 
                symbol={value}
            />
        </section>

    );
}
export default DetailsHeader;