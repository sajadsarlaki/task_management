import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { data, labels } from '../../data/dataset';
import LabelAddModal from './LabelAddModal';
const tempLabels = JSON.parse(
  localStorage.getItem('labels') || JSON.stringify(labels)
);

function Label({ item, onLabelsModalClose, showLabels, updateItem }) {
  //-------------------------------------------- states and data -----------------------------------
  // the value of the search field
  const [name, setName] = useState('');
  // the search result
  const [foundLabels, setFoundLabels] = useState(tempLabels);
  // modal for add or edit a label
  const [editAddLabelModal, setEditAddLabelModal] = useState(false);

  const [searchLabels, setSearchLabels] = useState(foundLabels)
  // loading tasks form local storage into state
  useEffect(() => {
    let theLabels = JSON.parse(localStorage.getItem('labels'));
    if (!theLabels) theLabels = labels;

    if (theLabels.length) {
      console.log(theLabels);
      setFoundLabels(theLabels);
    }
  }, []);

  //-------------------------------------------- functions -----------------------------------

  const onLabelModalClosed = () => {
    setEditAddLabelModal(false);
  };
  const onLabelModalOpen = () => {
    setEditAddLabelModal(true);
  };

  // mode 0 for edit , mode 1 for add
  const [mode, setMode] = useState(0);

  const [currentLabel, setCurrentLabel] = useState({});

  const filter = (e) => {
    const keyword = e.target.value.trim();

    if (keyword !== '') {
      const results = foundLabels.filter((label) => {
        return label.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setSearchLabels(results);
    } else {
      setSearchLabels(foundLabels);
    }

    setName(keyword);
  };

  const handleLabelClicked = (labelItem) => {
    const newItem = item;
    if (!newItem.labels) newItem.labels = [];

    if (item.labels.includes(labelItem)) {
      item.labels = item.labels.filter(
        (i) => i.name !== labelItem.name || i.color !== labelItem.color
      );
      updateItem(newItem);
      return;
    }

    newItem.labels.push(labelItem);
    updateItem(newItem);
    // onLabelsModalClose()
  };

  const addNewLabel = async (newLabel) => {
    const checkExistence = foundLabels.filter(
      (i) => i.name === newLabel.name && i.color === newLabel.color
    );
    console.log(checkExistence);
    if (!checkExistence.length) {
      const newLabels = foundLabels;
      newLabels.push(newLabel);
      await setFoundLabels([...newLabels]);
      console.log(foundLabels, 'here');

      localStorage.setItem('labels', JSON.stringify(foundLabels));
    }
  };

  const deleteLabel = (labelItem) => {
    setFoundLabels((prevState) => {
      const newLabels = prevState.filter(
        (i) => i.name !== labelItem.name || i.color !== labelItem.color
      );
      console.log(newLabels, '----->');
      localStorage.setItem('labels', JSON.stringify(newLabels));

      return [...newLabels];
    });
    //
    for (let i = 0; i < item.labels.length; i++) {
      if (
        item.labels[i].name === labelItem.name &&
        item.labels[i].color === labelItem.color
      )
        item.labels.splice(i, 1);
      updateItem(item);
      onLabelsModalClose();
    }
  };

  const editLabel = (prev, current) => {
    setFoundLabels((prevState) => {
      console.log(prevState);
      for (let i = 0; i < foundLabels.length; i++) {
        if (
          prevState[i].name === prev.name &&
          prevState[i].color === prev.color
        )
          prevState[i] = current;
      }
      return [...prevState];
    });

    for (let i = 0; i < item.labels.length; i++) {
      if (
        item.labels[i].name === prev.name &&
        item.labels[i].color === prev.color
      )
        item.labels[i] = current;
    }
    localStorage.setItem('labels', JSON.stringify(foundLabels));
  };

  const handleEditLabel = (labelItem) => {
    // set current item
    setCurrentLabel(labelItem);
    // setting mode to edit
    setMode(0);
    // opening popup
    onLabelModalOpen();
  };
  const handleAddLabel = () => {
    // setting mode to add
    setMode(1);
    // opening popup
    onLabelModalOpen();
  };

  // -------------------------------------------- rendering -----------------------------------------------
  return (
    <Modal
      isOpen={showLabels}
      onRequestClosed={onLabelsModalClose}
      className={'label-modal'}
      overlayClassName={'overlay'}
    >
      <div className="label-modal__content">
        <div className="label-modal__header">
          <p className={'label-modal__header-txt'}>Label Section</p>
          <div className={'label-modal--close'} onClick={onLabelsModalClose}>
            <span>???</span>
          </div>
        </div>
        <input
          type="search"
          value={name}
          onChange={filter}
          className="label-modal__input"
          placeholder="Filter"
        />

        <div className="label-modal__list">
          {searchLabels && searchLabels.length > 0 ? (
              searchLabels.map((labelItem) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <div
                  key={labelItem.id}
                  className="label-modal__item"
                  style={{ backgroundColor: labelItem.color }}
                  onClick={() => handleLabelClicked(labelItem)}
                >
                  {labelItem.name}
                  <span>{item.labels.includes(labelItem) ? '  ???' : ''}</span>
                </div>
                <span
                  className={'label-modal--edit'}
                  onClick={() => handleEditLabel(labelItem)}
                >
                  ???????
                </span>
              </div>
            ))
          ) : (
            <h1>No results found!</h1>
          )}
        </div>
      </div>
      <div className={'label-modal__add-btn'} onClick={handleAddLabel}>
        add new label
      </div>

      <LabelAddModal
        addNewLabel={addNewLabel}
        deleteLabel={deleteLabel}
        editLabel={editLabel}
        showingAddLabelModal={editAddLabelModal}
        onLabelModalClosed={onLabelModalClosed}
        onLabelModalOpen={onLabelModalOpen}
        prevState={currentLabel}
        mode={mode}
      />
    </Modal>
  );
}

export default Label;
