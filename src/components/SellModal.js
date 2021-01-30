import React, { useState } from 'react';
import Modal from './UI/Modal'
import { PropertyKeys } from 'ag-grid-community';
import useFetch from '../Shared/useFetch';
import {baseURL, getUserId} from '../Shared/useFetch';

const SellModal = (props) => {
    const [stocks] = useFetch('userdata/allocations');

    const addStock = async () => {
        const symbol = props.symbol;
        const side = "SELL";
        const amount = document.getElementById('stock_amount').value;
        const data = {symbol, side, amount, action: 'ADD'};
        const options = {method: 'POST',
         headers: { userId: getUserId(), 'Content-Type': 'application/json' }, 
         body: JSON.stringify(data)};
        const response = await fetch(`${baseURL}transactions`, options);
        props.closeModal && props.closeModal();
    }
    return(
        <Modal
            title={props.symbol}
            closeModal={props.closeModal}
        >

            <input id="stock_amount" class="modal__number-box" type="number" name="quantity" placeholder="enter amount" />

            <button className="modal_btn" onClick={addStock}>Sell stock</button>

        </Modal>
    );
}

export default SellModal;