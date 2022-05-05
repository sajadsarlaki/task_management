import {useEffect, useState} from 'react';
import Modal from 'react-modal'

Modal.setAppElement('#root');

const colorList = ["#aa6288","#DE3163","#FF7F50","#6495ED","#553973","#FDFD95","#F692BC","#F692BC","red","yellow","blue","green","purple"]

const LabelAddModal = ({
                    addNewLabel,
                    showingAddLabelModal,
                    onLabelModalClosed,
                    mode,
                    prevState,
                    deleteLabel,
                    editLabel
               }) => {

    console.log(prevState)


    const [selectedColor, setSelectedColor] = useState(mode?'':prevState.color);
    const [name, setName] = useState(mode?'':prevState.name);
    console.log(name);
    const selectColor = (e,color) => {
        const spans = document.getElementsByClassName('add-label-modal__single-color');
        for (let span of spans)
            span.innerText = '';
        e.target.innerText = "✔";
        setSelectedColor(color);
    }
    const handleAdd = () => {
        console.log('handle add')
        if (name.trim()){
            const newLabel = {
                name:name,
                color:selectedColor
            }
            addNewLabel(newLabel)
            onLabelModalClosed()
        }
    }
    const handleEdit = () => {
        const currentLabel = {
            name:name,
            color:selectedColor
        }
        editLabel(prevState, currentLabel);
        onLabelModalClosed()
    }

    const handleDelete = () => {
        deleteLabel(prevState)
        onLabelModalClosed()
    }
    return (
        <Modal
            isOpen = {showingAddLabelModal}
            onRequestClosed = {onLabelModalClosed}
            className={"add-label-modal"}
            overlayClassName={'overlay'}
        >
            <div className={'add-label-modal__header'}>
                <p onClick={onLabelModalClosed} className={'add-label-modal__header-txt'}>Add label</p>
                <span className={'add-label-modal--action add-label-modal__cancel'} onClick={onLabelModalClosed}>❌</span>
            </div>
            <input
                value={name}
                type={"text"}
                className={'add-label-modal__input'}
                placeholder={'Enter the name'}
                onChange={(e)=>setName(e.target.value)}

            />

            <div className={'add-label-modal__colors'}>
                {colorList.map((color) =>
                    <span
                        style={{backgroundColor:color}}
                        className={"add-label-modal__single-color"}
                        onClick={(e) => selectColor(e, color)}
                    />)}
            </div>

            <div>
                <span className={'add-label-modal--add-btn'}

                    onClick={mode? handleAdd:handleEdit}
                >
                    Ok👌</span>

                {!mode?
                    <span className={'add-label-modal--dl-btn'}
                      onClick={handleDelete }
                >remove</span> : ''}

            </div>

        </Modal>
    )
}

export default LabelAddModal;
