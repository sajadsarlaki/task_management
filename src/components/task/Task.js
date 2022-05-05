import React, {Fragment, useState, useRef}  from "react";
import {useDrag, useDrop} from 'react-dnd';
import Window from '../window/Window';
import ITEM_TYPE from '../../data/types'
import Popup from "../popup/Popup";
const Task = ({item, index, moveItem, removeItem, status, updateItem}) => {
    // delete popup
    const [riseDeletePopup, setRiseDeletePopup] = useState(false);
    const closePopup = () => setRiseDeletePopup(false);
    const showPopup = () => setRiseDeletePopup(true);

    // item clicked popup
    const [show, setShow] = useState(false);
    const onOpen = () => setShow(true);
    const onClose = () => setShow(false);

    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },

    });
    const [{isDragging}, drag] = useDrag({
        type:ITEM_TYPE,
        item:{
            ...item,
            index,
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })
    drag(drop(ref));


    return(
        <Fragment>
            <div
                ref={ref}
                style={{opacity: isDragging? 0:1}}
                className={'item'}
            >
                <div onClick={onOpen}>
                    <div className={'item__label-section'}>
                        {item.labels ?
                            item.labels.map(i=><span className={'item__label-span'} style={{backgroundColor:i.color}} />):""}

                    </div>
                    <div className="item__content" style={{backgroundColor: status.color}}>
                        <h3>{item.content}</h3>

                    </div>
                </div>


                <p className={'item__footer'}>
                    <span className="item__status">{item.icon}</span>
                    <button className={'item__dl-btn'} onClick={showPopup}>
                        ❌
                    </button>
                    <Popup incomingFunction={removeItem} incomingArg={item.id} closePopUp={closePopup} show={riseDeletePopup} />
                </p>


            </div>

            <Window
                item={item}
                onClose={onClose}
                show={show}
                updateItem={updateItem}
            />
        </Fragment>




    )
}

export default Task;
