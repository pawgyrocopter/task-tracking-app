import { BoardColumn, BoardTask } from '@/features/project/board/types'
import React, { createContext, useState, useContext } from 'react'

type ProjectBoardContextType = {
    columns: BoardColumn[]
    setColumns: (columns: BoardColumn[]) => void
    draggingTask: BoardTask | null
    showModal: boolean
    handleOpenModal: () => void
    handleCloseModal: () => void
    handleDragStart: (task: BoardTask) => void
    handleDragEnd: () => void
}

const ProjectBoardContext = createContext({} as ProjectBoardContextType)

export const ProjectBoardProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [showModal, setShowModal] = useState(false)
    const [draggingTask, setDraggingTask] = useState<BoardTask | null>(null)
    const [columns, setColumns] = useState<BoardColumn[]>([])

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleDragStart = (task: BoardTask) => {
        setDraggingTask(task)
    }

    const handleDragEnd = () => {
        setDraggingTask(null)
    }

    return (
        <ProjectBoardContext.Provider
            value={{
                columns,
                setColumns,
                draggingTask,
                showModal,
                handleOpenModal,
                handleCloseModal,
                handleDragStart,
                handleDragEnd,
            }}
        >
            {children}
        </ProjectBoardContext.Provider>
    )
}

export const useProjectBoard = () => useContext(ProjectBoardContext)
