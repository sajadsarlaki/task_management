import React, {useState} from "react";
import Modal from 'react-modal';
import '../../App.scss'
import Label from "../labels/Labels";
Modal.setAppElement('#root');



const Window = ({show, onClose, item, updateItem})=>{
    const [showLabelsModal, setShowLabelsModal] = useState(false);
    const onLabelsModalOpen = () => setShowLabelsModal(true);
    const onLabelsModalClose = () => setShowLabelsModal(false);
    return(
        <Modal
            isOpen = {show}
            onRequestClosed = {onClose}
            className={"modal"}
            overlayClassName={'overlay'}
        >
            <div className="close-btn-ctn" id={'btn'}>
                <h1 style={{flex:"1 90%"}}> {item.title}</h1>
                <button className={"closed-btn"} onClick={onClose}>X</button>
            </div>
            <div>
                <h2>Description</h2>
                <p>{item.content}</p>
                <h2>{item.status}</h2>
                <p>{item.icon}{`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}</p>
                <div className={'label_content'}>
                    {item.labels ?
                        item.labels.map(i=><span className={'label-span'} style={{backgroundColor:i.color}}>{i.name}</span>):""}
                </div>

            </div>
            <button onClick={onLabelsModalOpen}>
                labels
            </button>
            <Label
                item={item}
                onLabelsModalClose={onLabelsModalClose}
                showLabels={showLabelsModal}
                updateItem={updateItem}
            />

        </Modal>


    )
}

export default Window;
