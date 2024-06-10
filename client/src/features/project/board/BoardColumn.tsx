import BoardAddTaskButton from './BoardAddTaskButton'
import BoardTaskCard from './BoardTaskCard'
import { BoardColumn as BoardColumnType, BoardTask } from './types'
import AddTaskModal from './AddTaskModal'
import { useProjectBoard } from '@/context/ProjectBoardContext'
import { useState } from 'react'

const BoardColumn = ({ column }: { column: BoardColumnType }) => {
    const [isActive, setIsActive] = useState<boolean>(false)

    const {
        showModal,
        currentColumnId,
        handleOpenModal,
        handleCloseModal,
        handleDragStart,
        handleDragEnd,
    } = useProjectBoard()

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsActive(true)
    }

    const handleDragLeave = () => {
        setIsActive(false)
    }

    const handleDragDrop = () => {
        setIsActive(false)
    }

    return (
        <div
            className={`flex w-full flex-col rounded-lg p-4 md:h-full md:w-1/3 ${isActive ? 'bg-neutral-300' : 'bg-neutral-200'}`}
        >
            <h2 className="mb-4 text-xl font-semibold">
                {column.name} {column.tasks.length} of 21
            </h2>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragDrop}
                className="md:flex-grow md:overflow-auto"
            >
                {column.tasks.map((task: BoardTask) => (
                    <BoardTaskCard
                        handleDragStart={handleDragStart}
                        handleDragEnd={handleDragEnd}
                        columnId={column.id}
                        key={task.id}
                        task={task}
                    />
                ))}
                <BoardAddTaskButton
                    onClick={() => handleOpenModal(column.id)}
                />
            </div>
            <AddTaskModal
                columnName={getColumnName(currentColumnId)}
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
