import React, { useState } from 'react';
import Modal from 'react-modal';
// This holds a list of some fiction people
// Some  have the same name but different age and id
const labels = [
    { id: 1, name: 'Andy',  },
    { id: 2, name: 'Bob',  },
    { id: 3, name: 'Tom Hulk' },
    { id: 4, name: 'Tom Hank' },
    { id: 5, name: 'Audra',  },
    { id: 6, name: 'Anna',  },
    { id: 7, name: 'Tom' },
    { id: 8, name: 'Tom Riddle' },
    { id: 9, name: 'Bolo' },
];

function Label({item, onLabelsModalClose, showLabels}) {
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

    return (
        <Modal
            isOpen = {showLabels}
            onRequestClosed = {onLabelsModalClose}
            className={"modal"}
            overlayClassName={'overlay'}
        >
        <div className="container">
            <input
                type="search"
                value={name}
                onChange={filter}
                className="input"
                placeholder="Filter"
            />

            <div className="label-list">
                {foundLabels && foundLabels.length > 0 ? (
                    foundLabels.map((user) => (
                        <li key={user.id} className="user">
                            <span className="user-id">{user.id}</span>
                            <span className="user-name">{user.name}</span>
                        </li>
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



