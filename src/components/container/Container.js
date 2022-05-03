import React, { useState } from 'react'
import Task from "../task/Task";
import DropWrapper from "../dropWrapper/DropWrapper";
import Column from "../column/Column";
import {data, statuses} from '../../data/dataset'
const Container = () => {
    const [items, setItems] = useState(data);
    const updateItem = (updatedItem) => {
        let index;
        for (let i = 0; i<items.length;i++){
            if (items[i].id === updatedItem.id)
                index = i;
        }
        console.log(index)

        setItems( prevState => {

            const newItems = prevState;
            newItems.splice(index,1,updatedItem);
            return [...newItems]
        })

    }



    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(si => si.status === status);
        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({...item, status, icon:mapping.icon})
            return[...newItems]
        })
    }

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex,0,item);
            return[...newItems]
        })
    }

    const removeItem = (id) => {
        const newItems = items.filter(i => i.id !== id)
        setItems(
            [...newItems]
        )
    }
    const addNewItem = () => {
        const lastId = items[items.length - 1].id
        const newTask = {
            id: lastId + 1,
                icon: "⭕️",
            status: "open",
            title: "Daily reading",
            content: "Finish reading Intro to UI/UX"
        }
        setItems([...items,newTask])
    }
    return(
        <div className="content">
            <button className={'content__add-btn'} onClick={addNewItem}>
                Click to add
            </button>
            {statuses.map(s=>{
                return(
                    <div key={s.status } className={'col-wrapper'}>
                        <h2 className={'col-wrapper__header'}>{s.status.toUpperCase()}</h2>
                        <DropWrapper onDrop={onDrop} status={s.status}>
                            <Column>
                                {items.filter(i => i.status === s.status)
                                    .map((i,idx)=> <Task key={i.id} item={i} index={idx} moveItem={moveItem} status={s.status} removeItem={removeItem} updateItem={updateItem}/>
                                    )}
                            </Column>
                        </DropWrapper>

                    </div>
                )
            })}

        </div>
    )
}

export default Container
