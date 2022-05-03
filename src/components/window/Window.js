import React from "react";
import Modal from 'react-modal';
import '../../App.scss'

Modal.setAppElement('#root');
const Window = ({show, onClose, item})=>{
    return(
        <Modal
            isOpen = {show}
            onRequestClosed = {onClose}
            className={"modal"}
            overlayClassName={'overlay'}
        >
            <div className="close-btn-ctn">
                <h1 style={{flex:"1 90%"}}> {item.title}</h1>
                <button className={"closed-btn"} onClick={onClose}>X</button>
            </div>
            <div>
                <h2>Description</h2>
                <p>{item.content}</p>
                <h2>{item.status}</h2>
                <p>{item.icon}{`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}</p>
            </div>

        </Modal>
    )
}

export default Window;
