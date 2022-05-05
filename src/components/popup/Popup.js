import { useState } from 'react';
import Modal from 'react-modal'

Modal.setAppElement('#root');

const Popup = ({incomingFunction,incomingArg, show, closePopUp}) => {
    return (
        <Modal
            isOpen = {show}
            onRequestClosed = {closePopUp}
            className={"delete-modal"}
            overlayClassName={'overlay'}
        >
            <div className={'delete-modal__header'}>
                <p onClick={closePopUp} className={'delete-modal__header-txt'}><span className={'delete-modal__alert'}>⚠️</span>️Alert</p>
                <span className={'delete-modal--action delete-modal__cancel'} onClick={closePopUp}>❌</span>
            </div>
            <p className={'delete-modal__msg'}>
                Do you shore you want to remove this item?
            </p>
            <div className={'delete-modal__footer'}>
                <span className={'delete-modal--action delete-modal__no'} onClick={closePopUp}>No <span className={'delete-modal__icon '}> 🙅‍♂️</span></span>
                <span className={'delete-modal--action delete-modal__yes'} onClick={() => incomingFunction(incomingArg)}>Yes <span className={'delete-modal__icon '}>🤷</span></span>
            </div>
        </Modal>
    )
}

export default Popup;
