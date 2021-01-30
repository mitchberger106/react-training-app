import React, { useState } from 'react';
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import useFetch, { DEFAULT_OPTIONS } from '../Shared/useFetch';

const HighChart = (props) => {
    const [fetchOptions, setFetchOptions] = useState(DEFAULT_OPTIONS);

    const [stocks] = useFetch('userdata/watchlist', fetchOptions);
    const stock = props.symbol != null ? props.symbol : stocks && stocks[0].symbol;
    console.log(stock);
    const [prices, isLoading, error] = useFetch('stocks/'+stock+'/price/today', fetchOptions);

    const getDate = (index) => {
        const firstdate = prices && prices;
        const datelistaggregated = firstdate && firstdate.aggregated;
        console.log(datelistaggregated && datelistaggregated.map(val => val.date.substring(11,19)));
        return datelistaggregated && datelistaggregated[index].date.substring(11,19);
    }

    const getVals = (index) => {
        const firstval = prices && prices;
        const vallistaggregated = firstval && firstval.aggregated;
        console.log(vallistaggregated && vallistaggregated.map(thing => thing.price))
        return vallistaggregated && vallistaggregated[index].price;
    }

    const getFirstSymbol = () => {
        const stock = stocks && stocks[0];
        return stock && stock.symbol;
    }

    const options = {
        chart: {
            type: 'line'
        },
        title: {
            text: stock
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [getDate(0),getDate(2),getDate(4),getDate(6),getDate(8)]
        },
        yAxis: {
            title: {
                text: 'Prices'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: props.symbol ? props.symbol : stock,
            data: [getVals(0),getVals(2),getVals(4),getVals(6),getVals(8)]
        }]
    }
    if (error) {
        return <div>'Error: {error}'</div>
    } else if (isLoading) {
        return <div>Loading...</div>
    } else{
    return (
        <section class={"stock-graph" + (props.full ? ' full-width' : '')}>
            <div id="stockGraphContainer" class="stock-graph__container">
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
            </div>
        </section>
    );
}
}
export default HighChart;