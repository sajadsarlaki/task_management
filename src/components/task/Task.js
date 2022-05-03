import React from 'react'
import './task.scss'
import { Draggable } from 'react-beautiful-dnd'

function Task(props) {
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (
                <div
                    className={'task'}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    {props.task.content}
                </div>
            )}
        </Draggable>
    )
}

export default Task
