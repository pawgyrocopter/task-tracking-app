import { BoardColumn, BoardTask } from '@/features/project/board/types'
import React, { createContext, useState, useContext } from 'react'

type ProjectBoardContextType = {
    columns: BoardColumn[]
    setColumns: (columns: BoardColumn[]) => void
    totalTasks: number
    setTotalTasks: (totalTasks: number) => void
    setDraggingTask: (boardTask: BoardTask | null) => void
    draggingTask: BoardTask | null
    showModal: boolean
    currentColumnId: number
    handleOpenModal: (columnId: number) => void
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
    const [currentColumnId, setCurrentColumnId] = useState<number>(-1)
    const [totalTasks, setTotalTasks] = useState<number>(0)

    const handleOpenModal = (columnId: number) => {
        setCurrentColumnId(columnId)
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
                totalTasks,
                setTotalTasks,
                draggingTask,
                setDraggingTask,
                showModal,
                currentColumnId,
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
