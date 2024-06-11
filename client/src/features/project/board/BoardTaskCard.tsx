import { motion } from 'framer-motion'
import { BoardColumn, BoardTask, TaskPriority } from './types'
import DropIndicator from './DropIndicator'
import TaskModal from './TaskModal'
import { useState } from 'react'

const BoardTaskCard = ({
    column,
    task,
    handleDragStart,
    handleDragEnd,
    isLastCard,
}: {
    column: BoardColumn
    task: BoardTask
    handleDragStart: (task: BoardTask) => void
    handleDragEnd: () => void
    isLastCard: boolean
}) => {
    const [showModal, setShowModal] = useState<boolean>(false)

    return (
        <>
            <DropIndicator beforeId={task.id} columnId={column.id} />
            <motion.div
                layout
                layoutId={task.id}
                key={task.id}
                onClick={() => setShowModal(true)}
                onDragEnd={handleDragEnd}
                onDragStart={() => handleDragStart(task)}
                draggable={true}
                className="cursor-pointer rounded-lg bg-white p-4 shadow-md active:cursor-grabbing"
            >
                <div className="flex items-center gap-3">
                    <h3 className="mb-2 font-semibold">{task.name}</h3>
                    <div
                        className={`h-3 w-3 rounded-full ${getPriorityColor(
                            task.priority
                        )} mb-2`}
                    ></div>
                </div>
                <p className="text-sm text-gray-600">{task.description}</p>
                <div className="flex space-x-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200">
                        {task.avatar}
                    </div>
                </div>
            </motion.div>
            {isLastCard && (
                <DropIndicator beforeId={'-1'} columnId={column.id} />
            )}
            <TaskModal
                show={showModal}
                onClose={() => setShowModal(false)}
                task={task}
            />
        </>
    )
}

function getPriorityColor(priority: TaskPriority): string {
    switch (priority) {
        case 'HIGHEST':
            return 'bg-red-500'
        case 'HIGH':
            return 'bg-orange-500'
        case 'MEDIUM':
            return 'bg-yellow-400'
        case 'LOW':
            return 'bg-green-400'
        case 'LOWEST':
            return 'bg-gray-400'
    }
}

export default BoardTaskCard
