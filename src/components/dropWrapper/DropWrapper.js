import React, {useState} from "react";
import {useDrop} from "react-dnd";
import ITEM_TYPE from "../../data/types";
import {statuses} from '../../data/dataset'
import Popup from '../popup/Popup'

const DropWrapper = ({ onDrop, children, status, deleteColumn }) => {
    const [riseDeletePopup, setRiseDeletePopup] = useState(false);
    const closePopup = () => setRiseDeletePopup(false);
    const showPopup = () => setRiseDeletePopup(true);

    const [{ isOver }, drop] = useDrop({
        accept: ITEM_TYPE,
        canDrop: (item, monitor) => {
            const itemIndex = statuses.findIndex(si => si.status === item.status);
            const statusIndex = statuses.findIndex(si => si.status === status);
            // return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
            return true;
        },
        drop: (item, monitor) => {
            onDrop(item, monitor, status);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop} className={"drop-wrapper"}>
            <div className="drop-wrapper__header">
                <p className="drop-wrapper__header-txt">{status.toUpperCase()}</p>
                <span className={"drop-wrapper--icon"} onClick={showPopup}>🗑️</span>
            <Popup incomingFunction={deleteColumn} incomingArg={status} show={riseDeletePopup} closePopUp={closePopup}/>
            </div>

            {React.cloneElement(children, { isOver })}
        </div>
    )
};

export default DropWrapper;
