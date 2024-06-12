import React, { useState } from 'react'
import Modal from '@/components/ui/Modal'
import { BoardTask } from '../board/types'
import TaskEdit from './TaskEdit'
import TaskView from './TaskView'
import { useProjectBoard } from '@/context/ProjectBoardContext'

interface AddTaskModalProps {
    show: boolean
    onClose: () => void
    task: BoardTask
}

const TaskModal: React.FC<AddTaskModalProps> = ({ show, onClose, task }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTask, setEditedTask] = useState<BoardTask>({ ...task })

    const { columns, setColumns } = useProjectBoard()

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target

        let modifiedValue = value

        if (name === 'priority') {
            modifiedValue = value.toUpperCase()
        }

        setEditedTask({ ...editedTask, [name]: modifiedValue })
    }

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleSaveClick = () => {
        // make api request

        // update task on the client
        const newColumns = columns.map((column) => {
            const newTasks = column.tasks.map((task) => {
                if (task.id === editedTask?.id) {
                    return editedTask // replace the task with the editedTask
                }
                return task
            })
            return { ...column, tasks: newTasks }
        })
        setColumns(newColumns)
        setIsEditing(false)
    }

    const handleCancelClick = () => {
        setIsEditing(false)
        setEditedTask({ ...task }) // reset to original task details
    }

    return (
        <Modal
            className="mt-[2rem] h-[calc(100%-0.5rem)] w-full md:ml-[190px] md:mt-[3.5rem] md:h-[calc(100%-3.5rem)] md:w-[50rem]"
            show={show}
            onClose={() => {
                setIsEditing(false)
                onClose()
            }}
        >
            {isEditing ? (
                <TaskEdit
                    task={editedTask}
                    onChange={handleInputChange}
                    onSave={handleSaveClick}
                    onCancel={handleCancelClick}
                />
            ) : (
                <TaskView task={task} onEdit={handleEditClick} />
            )}
        </Modal>
    )
}

export default TaskModal
