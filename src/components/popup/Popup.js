import { useState } from 'react';
import Modal from 'react-modal'

Modal.setAppElement('#root');

const Popup = ({incomingFunction,incomingArg, show, closePopUp}) => {
    const [popup, setPopup] = useState(show);
    console.log('hey')
    return (
        <Modal
            isOpen = {show}
            onRequestClosed = {closePopUp}
            className={"modal"}
            overlayClassName={'overlay'}
        >
            <div>
                hey
                <button onClick={closePopUp}>click</button>
                <button onClick={() => incomingFunction(incomingArg)}>shore</button>
            </div>
        </Modal>
    )
}

export default Popup;
