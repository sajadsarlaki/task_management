import React from 'react'
import './column.scss'
import Task from '../task/Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'



function Column(props) {
    return (
        <Draggable draggableId={props.column.id} index={props.index}>
            {(provided) => (
                <div className={'column'}
                    ref={provided.innerRef}
                    {...provided.draggableProps}>
                    <h3 className={'column__title'} {...provided.dragHandleProps}>{props.column.title}</h3>
                    <Droppable droppableId={props.column.id} type='task'>
                        {(provided, snapshot) => (
                            <div
                                className={'column__taskList'}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>

            )}
        </Draggable>
    )
}

export default Column
