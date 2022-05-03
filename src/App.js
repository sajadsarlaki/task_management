import React, { useState } from 'react'
import dataset from './dataset/dataset'
import Column from './components/column/Column'
import './App.scss'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'




const App = () => {
    const [data, setData] = useState(dataset)



    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='all-columns' direction='horizontal' type='column'>
                {(provided) => (
                    <div className={'container'} {...provided.droppableProps} ref={provided.innerRef}>
                        {data.columnOrder.map((id, index) => {
                            const column = data.columns[id]
                            const tasks = column.taskIds.map(taskId => data.tasks[taskId])

                            return <Column key={column.id} column={column} tasks={tasks} index={index} />
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default App
