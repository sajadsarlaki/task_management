import React, { useState } from 'react';
import Modal from 'react-modal';
// This holds a list of some fiction people
// Some  have the same name but different age and id
import {labels} from "../../data/dataset";

function Label({item, onLabelsModalClose, showLabels, updateItem}) {
    // the value of the search field
    const [name, setName] = useState('');
    // the search result
    const [foundLabels, setFoundLabels] = useState(labels);
    const filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = labels.filter((user) => {
                return user.name.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setFoundLabels(results);
        } else {
            setFoundLabels(labels);
            // If the text field is empty, show all users
        }

        setName(keyword);
    };

    const addLabelToItems = (labelItem) => {
        const newItem = item;
        if(item.labels.includes(labelItem)){
            onLabelsModalClose()
            return
        }

        newItem.labels.push(labelItem);
        updateItem(newItem);
        onLabelsModalClose()
    }

    const addNewLabel = () => {
        let newLabel = { id:10, name: 'kos', color:'pink'  }
        setFoundLabels([...foundLabels.concat(newLabel)])

    }
    const deleteLabel = () => {
        const label = {name: 'bob', color:'pink'  };
        item.labels.splice(item.labels.indexOf(i=>i.name == label.name),1)
        console.log(item)
        updateItem(item)
        onLabelsModalClose()
    }
    return (
        <Modal
            isOpen = {showLabels}
            onRequestClosed = {onLabelsModalClose}
            className={"label-modal"}
            overlayClassName={'overlay'}
        >
        <div className="label-modal__content">
            <input
                type="search"
                value={name}
                onChange={filter}
                className="label-modal__input"
                placeholder="Filter"
            />

            <div className="label-modal__list">
                {foundLabels && foundLabels.length > 0 ? (
                    foundLabels.map((labelItem) => (
                        <div
                            key={labelItem.id}
                            className="label-modal__item"
                            style={{backgroundColor:labelItem.color}}
                            onClick={() => addLabelToItems(labelItem)}
                        >
                          {labelItem.name}
                        </div>
                    ))
                ) : (
                    <h1>No results found!</h1>
                )}
            </div>
        </div>
            <button onClick={() => addNewLabel()}>
                add new label
            </button>
            <button onClick={() => deleteLabel()}>
                delete label
            </button>
        </Modal>
    );
}

export default Label;



