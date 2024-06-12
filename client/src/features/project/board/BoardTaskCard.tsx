import { motion } from 'framer-motion'
import { BoardColumn, BoardTask } from './types'
import DropIndicator from './DropIndicator'
import TaskModal from '../task-modal/TaskModal'
import { useState } from 'react'
import { getPriorityColor } from './shared'

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
                className="flex cursor-pointer flex-col gap-2 rounded-lg bg-white p-4 shadow-md active:cursor-grabbing"
            >
                <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{task.name}</h3>
                    <div
                        className={`h-3 w-3 rounded-full ${getPriorityColor(
                            task.priority
                        )}`}
                    ></div>
                </div>
                <p className="text-sm text-gray-600">{task.description}</p>
                <img
                    src={task.avatar}
                    className="flex h-6 w-6 items-center justify-center rounded-full"
                />
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

export default BoardTaskCard
