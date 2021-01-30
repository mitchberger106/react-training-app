import React, { useState } from 'react';
import Modal from './UI/Modal'
import { PropertyKeys } from 'ag-grid-community';
import useFetch from '../Shared/useFetch';
import {baseURL, getUserId} from '../Shared/useFetch';

const StockAddModal = (props) => {

    const [stocks] = useFetch('stocks');

    const addStock = async () => {
        const symbol = document.getElementById('stocksToAddDropDown').value;
        const data = {symbol, action: 'ADD'};
        const options = {method: 'POST',
         headers: { userId: getUserId(), 'Content-Type': 'application/json' }, 
         body: JSON.stringify(data)};
        const response = await fetch(`${baseURL}userdata/watchlist`, options);
        props.closeModal && props.closeModal();
    }
    return(
        <Modal
            title="Select a new stock to follow"
            closeModal={props.closeModal}
        >
            <select id="stocksToAddDropDown" class="modal__dropdown">
                {stocks && stocks.map(stock =>
                    <option key={stock.symbol} value={stock.symbol}>{`${stock.symbol} - ${stock.name}`}</option>)

                }
            </select>

            <button className="modal_btn" onClick={addStock}>Add</button>

        </Modal>
    );
}

export default StockAddModal;