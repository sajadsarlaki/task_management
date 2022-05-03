import React, { useState } from 'react';
import Modal from 'react-modal';
// This holds a list of some fiction people
// Some  have the same name but different age and id
const labels = [
    { id: 1, name: 'Andy', color:'#fd2'  },
    { id: 2, name: 'Bob',  color:'#900'},
    { id: 3, name: 'Tom Hulk', color:'#090'},
    { id: 4, name: 'Tom Hank', color:'#009' },
    { id: 5, name: 'Audra',  },
    { id: 6, name: 'Anna',  },
    { id: 7, name: 'Tom' },
    { id: 8, name: 'Tom Riddle' },
    { id: 9, name: 'Bolo' },
];

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
        newItem.labels.push(labelItem);
        updateItem(newItem)
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
        </Modal>
    );
}

export default Label;



