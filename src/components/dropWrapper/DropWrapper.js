import React, {useState} from "react";
import {useDrop} from "react-dnd";
import ITEM_TYPE from "../../data/types";
import {statuses} from '../../data/dataset'
import Popup from '../popup/Popup'

const DropWrapper = ({ onDrop, children, column, addNewItem, deleteColumn }) => {
    const [riseDeletePopup, setRiseDeletePopup] = useState(false);
    const closePopup = () => setRiseDeletePopup(false);
    const showPopup = () => setRiseDeletePopup(true);

    const [newItemText, setNewItemTask] = useState("")

    const [{ isOver }, drop] = useDrop({
        accept: ITEM_TYPE,
        canDrop: (item, monitor) => {
            const itemIndex = statuses.findIndex(si => si.status === item.status);
            const statusIndex = statuses.findIndex(si => si.status === column.status);
            // return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
            return true;
        },
        drop: (item, monitor) => {
            onDrop(item, monitor, column.status);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    const addIt = (e) => {
        if (e.key ==='Enter' && newItemText.trim()){
            addNewItem(newItemText.trim(), column);
            setNewItemTask('');

        }
    }

    return (
        <>
            <div ref={drop} className={"drop-wrapper"}>
                <div className="drop-wrapper__header">
                    <p className="drop-wrapper__header-txt">{column.status.toUpperCase()}</p>
                    <span className={"drop-wrapper--icon"} onClick={showPopup}>🗑️</span>
                    <Popup incomingFunction={deleteColumn} incomingArg={column.status} show={riseDeletePopup} closePopUp={closePopup}/>
                </div>
                {React.cloneElement(children, { isOver })}
            </div>
            <div className={'content__add-area'}>
                <textarea
                    name={`text}`}
                    cols="25"
                    rows="4"
                    value={newItemText}
                    onChange={(e) => setNewItemTask(e.target.value.replace('\n',""))}
                    onKeyDown={(e) => addIt(e)}
                    placeholder={"+ write and hit enter"}
                    className={"content__input"}
                />
            </div>
        </>

    )
};

export default DropWrapper;
