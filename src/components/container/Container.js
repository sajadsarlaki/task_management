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
    const [theColumns, setTheColumns] = useState(tempStatuses);

    const [newColumn, setNewColumn] = useState({
        status:"",
        icon: "✅",
        color: "red"
    })
    // saving data whenever tasks changes
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));


    }, [items]);
    // saving data whenever tasks changes
    useEffect(() => {
        localStorage.setItem('columns', JSON.stringify(theColumns));
    }, [theColumns]);


    // loading tasks form local storage into state
    useEffect(() => {

        const items = JSON.parse(localStorage.getItem('items'));

        if (items.length) {
            setItems(items);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));

    }, [items]);

    // loading statuses form local storage into state
    useEffect(() => {
        const itemsColumn = JSON.parse(localStorage.getItem('columns'));
        if (statuses.length) {
            setTheColumns(itemsColumn);
        }
    }, []);


    const updateItem = (updatedItem) => {
        let index;
        for (let i = 0; i<items.length;i++){
            if (items[i].id === updatedItem.id)
                index = i;
        }

        setItems( prevState => {
            const newItems = prevState;
            newItems.splice(index,1,updatedItem);
            return [...newItems]
        })

    }
    const onDrop = (item, monitor, status) => {
        const mapping = theColumns.find(si => si.status === status);
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
    const addNewItem = (text, col) => {
        let lastId = 1;
        items.forEach(i=>{
            if (i.id > lastId)
                lastId = i.id;
        })

        const newTask = {
            id: lastId + 1,
            icon: col.icon,
            status: col.status,
            title: "Daily reading",
            content: text,
            labels:[]
        }
        setItems([...items,newTask])
    }

    const addItemsColumn = (e) => {
        if (e.key ==='Enter'){
            if(newColumn.status.trim())
                setNewColumn({...newColumn,status:"New Item" })
            if (!theColumns.filter(i => i.status === newColumn.status).length)
                setTheColumns(prevState => [...prevState.concat(newColumn)])
            else {
                alert('sorry')
            }
        }

    }
    const deleteColumn = (status) => {
        setTheColumns([...theColumns.filter(i=>i.status !== status)]);
    }
    return(
        <div className="content">


            {theColumns.map(col=>{
                return(
                    <div key={col.status } className={'col-wrapper'} >
                        <DropWrapper onDrop={onDrop} column={col} addNewItem={addNewItem} deleteColumn={deleteColumn} >
                            <Column addNewItem={addNewItem}>
                                {items.filter(i => i.status === col.status)
                                    .map((i,idx)=> <Task key={i.id} item={i} index={idx} moveItem={moveItem} status={col.status} removeItem={removeItem} updateItem={updateItem}/>
                                    )}
                            </Column>
                        </DropWrapper>

                    </div>
                )
            })}
            <div className="col-wrapper">
                 <input
                     name={`text}`}
                     type={'text'}
                     value={newColumn.status}
                     onChange={(e) => setNewColumn({...newColumn,status: e.target.value})}
                     onKeyDown={(e) => addItemsColumn(e)}
                     placeholder={" add column"}
                     className={"col-wrapper__input"}

                 />
            </div>

        </div>
    )
}

export default Container
