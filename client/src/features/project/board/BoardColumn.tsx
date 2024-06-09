import { useState } from 'react'
import BoardAddTaskButton from './BoardAddTaskButton'
import BoardTaskCard from './BoardTaskCard'
import { BoardColumn as BoardColumnType, BoardTask } from './types'
import AddTaskModal from './AddTaskModal'

const BoardColumn = ({ column }: { column: BoardColumnType }) => {
    const [showModal, setShowModal] = useState(false)

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <div className="flex w-full flex-col rounded-lg bg-gray-100 p-4 md:h-full md:w-1/3">
            <h2 className="mb-4 text-xl font-semibold">
                {column.name} {column.tasks.length} of 21
            </h2>
            <div className="md:flex-grow md:overflow-auto">
                {column.tasks.map((task: BoardTask) => (
                    <BoardTaskCard key={task.id} task={task} />
                ))}
                <BoardAddTaskButton onClick={handleOpenModal} />
            </div>
            <AddTaskModal
                columnName={getColumnName(column.id)}
                show={showModal}
                onClose={handleCloseModal}
            />
        </div>
    )
}

function getColumnName(columnId: number): string {
    switch (columnId) {
        case 0:
            return 'To do'
        case 1:
            return 'In progress'
        case 2:
            return 'Done'
        default:
            return ''
    }
}

export default BoardColumn
