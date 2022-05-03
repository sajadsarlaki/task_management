import React, {Fragment, useState, useRef}  from "react";
import {useDrag, useDrop} from 'react-dnd';
import Window from '../window/Window';
import ITEM_TYPE from '../../data/types'
const Task = ({item, index, moveItem, removeItem, status, updateItem}) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor){
            if (!ref.current)
                return
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex)
                return;

            const hoverRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverRect.bottom - hoverRect.top)/2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoverRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY){
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY){
                return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex
        }
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
    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);
    const onClose = () => setShow(false);
    drag(drop(ref));


    return(
        <Fragment>
            <div
                ref={ref}
                style={{opacity: isDragging? 0:1}}
                className={'item'}
                onClick={onOpen}
            >
                <div className="item__color-bar" style={{backgroundColor: status.backgroundColor}}>
                <h3 className="item__content">{item.content}</h3>
                    <p className="item__status">{item.icon}</p>

                    {item.labels ?
                        item.labels.map(i=><span className={'label-span'} style={{backgroundColor:i.color}}>{i.name}</span>):""}

                </div>


                <p>

                    <button onClick={()=>removeItem(item.id)}>
                        remove
                    </button>
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
