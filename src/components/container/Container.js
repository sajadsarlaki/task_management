import React, { useState } from 'react'
import './container.scss'
import '../../App.scss'
import Task from "../task/Task";
import DropWrapper from "../dropWrapper/DropWrapper";
import Column from "../column/Column";
import {data, statuses} from '../../data/dataset'
const Container = () => {
    const [items, setItems] = useState(data);
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
    return(
        <div className="row">
            {statuses.map(s=>{
                return(
                    <div key={status} className={'col-wrapper'}>
                        <h2 className={'col-header'}>{s.status.toUpperCase()}</h2>
                        <DropWrapper onDrop={onDrop} status={s.status}>
                            <Column>
                                {items.filter(i => i.status === s.status)
                                    .map((i,idx)=> <Task key={i.id} item={i} index={idx} moveItem={moveItem} status={s.status}/>
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
