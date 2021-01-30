import React from 'react';
import { createPortal } from 'react-dom';

const Modal = (props) => {
    return(
        createPortal(
            <div className="modal">
                <div className="modal__overlay"></div>
                <div className="modal__content">
                    <div className="modal__close" onClick={props.closeModal}>x</div>
                    <h2 className="modal__h2">{props.title}</h2>
                    {props.children}
                </div>
            </div>
        , document.getElementById('modal')
        )
    );
}

export default Modal;