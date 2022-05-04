import React, { useState, useEffect } from 'react'
import Task from "../task/Task";
import DropWrapper from "../dropWrapper/DropWrapper";
import Column from "../column/Column";
import {data, statuses} from '../../data/dataset'
const tempTasks = JSON.parse(localStorage.getItem('items') || JSON.stringify(data));
const tempStatuses = JSON.parse(localStorage.getItem('columns') || JSON.stringify(statuses));

const Container = () => {
    // task
    const [items, setItems] = useState(tempTasks);
    // statuses
    const [itemsColumn, setItemsColumn] = useState(tempStatuses);

    // saving data whenever tasks changes
    useEffect(() => {
        console.log('saving => ', JSON.stringify(items))
        localStorage.setItem('items', JSON.stringify(items));


    }, [items]);
    // saving data whenever tasks changes
    useEffect(() => {
        localStorage.setItem('columns', JSON.stringify(itemsColumn));
    }, [itemsColumn]);


    // loading tasks form local storage into state
    useEffect(() => {

        const items = JSON.parse(localStorage.getItem('items'));
        console.log('reading => ', items)

        if (items.length) {
            console.log(items)
            setItems(items);
        }
    }, []); useEffect(() => {
        console.log('saving => ', JSON.stringify(items))
        localStorage.setItem('items', JSON.stringify(items));

    }, [items]);

    // loading statuses form local storage into state
    useEffect(() => {
        const itemsColumn = JSON.parse(localStorage.getItem('columns'));
        console.log('reading => ', itemsColumn)
        if (statuses.length) {
            console.log(itemsColumn)
            setItemsColumn(itemsColumn);
        }
    }, []);


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
        const mapping = itemsColumn.find(si => si.status === status);
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
        let lastId = 1;
        items.forEach(i=>{
            if (i.id > lastId)
                lastId = i.id;
        })

        const newTask = {
            id: lastId + 1,
                icon: "⭕️",
            status: "open",
            title: "Daily reading",
            content: "Finish reading Intro to UI/UX"
        }
        setItems([...items,newTask])
    }

    const addItemsColumn = () => {
        const newCol ={
            status: `done + ${Math.floor(Math.random()*5)}`,
            icon: "✅",
            color: "#3981DE"
        }
        setItemsColumn(prevState => [...prevState.concat(newCol)])
        console.log(itemsColumn)
    }

    return(
        <div className="content">
            <button className={'content__add-btn'} onClick={addNewItem}>
                Click to add
            </button>

            <button className={'content__add-btn'} onClick={addItemsColumn}>
                Click to add column
            </button>
            {itemsColumn.map(col=>{
                return(
                    <div key={col.status } className={'col-wrapper'}>
                        <h2 className={'col-wrapper__header'}>{col.status.toUpperCase()}</h2>
                        <DropWrapper onDrop={onDrop} status={col.status}>
                            <Column>
                                {items.filter(i => i.status === col.status)
                                    .map((i,idx)=> <Task key={i.id} item={i} index={idx} moveItem={moveItem} status={col.status} removeItem={removeItem} updateItem={updateItem}/>
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
