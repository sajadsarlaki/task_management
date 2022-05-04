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
            <div className="modal__header" id={'btn'}>
                <h1 style={{flex:"1 90%"}}> {item.title}</h1>
                <button className={"closed-btn"} onClick={onClose}>X</button>
            </div>
            <div className={"modal__content"}>
                <h2><span>📝</span>️ Description</h2>
                <p className={"modal__desc"}>{item.content}</p>
                <h2><span>🔘</span> State</h2>
                <p className={"modal__status"}>{item.icon}{`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}</p>
                <h2><span>🔖</span>️ Labels</h2>
                <div className={"modal__label-labels"}>
                    {item.labels ?
                        item.labels.map(i=><span className={"modal__label-span"} style={{backgroundColor:i.color}}>{i.name}</span>):""}
                    <span className={'modal__label--add'} onClick={onLabelsModalOpen}>
                    + labels
                </span>
                </div>

                <Label
                    item={item}
                    onLabelsModalClose={onLabelsModalClose}
                    showLabels={showLabelsModal}
                    updateItem={updateItem}
                />

            </div>


        </Modal>


    )
}

export default Window;
