import BoardAddTaskButton from './BoardAddTaskButton'
import BoardTaskCard from './BoardTaskCard'
import { BoardColumn as BoardColumnType, BoardTask } from './types'
import AddTaskModal from './AddTaskModal'
import { useProjectBoard } from '@/context/ProjectBoardContext'
import { useState } from 'react'
import DropIndicator from './DropIndicator'

const BoardColumn = ({ column }: { column: BoardColumnType }) => {
    const [isActive, setIsActive] = useState<boolean>(false)

    const {
        showModal,
        currentColumnId,
        draggingTask,
        columns,
        setColumns,
        handleOpenModal,
        handleCloseModal,
        handleDragStart,
        handleDragEnd,
    } = useProjectBoard()

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        highlightIndicatior(e, column)
        setIsActive(true)
    }

    const handleDragLeave = () => {
        setIsActive(false)
        clearHighlights(column)
    }

    const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
        setIsActive(false)
        clearHighlights(column)

        const taskId = draggingTask?.id

        if (taskId) {
            const indicators = getIndicators(column)
            const { element } = getNearestIndicators(e, indicators)

            const columnId = Number(element.dataset.column || '-1')
            const beforeId = element.dataset.before || '-1'

            if (columnId !== -1) {
                const updatedColumns = columns.map((col) => {
                    // remove draggingTask from its original column
                    let tasks = col.tasks.filter((task) => task.id !== taskId)

                    // add draggingTask to the new column at the correct position
                    if (col.id === columnId) {
                        if (beforeId === '-1') {
                            // put task at the end if 'before' is -1
                            tasks = [...tasks, draggingTask]
                        } else {
                            // find index of the beforeId task
                            const beforeIndex = tasks.findIndex(
                                (task) => task.id === beforeId
                            )
                            if (beforeIndex !== -1) {
                                tasks = [
                                    ...tasks.slice(0, beforeIndex),
                                    draggingTask,
                                    ...tasks.slice(beforeIndex),
                                ]
                            } else {
                                // put task at the end if beforeId is not found
                                tasks = [...tasks, draggingTask]
                            }
                        }
                    }

                    return {
                        ...col,
                        tasks,
                    }
                })

                setColumns(updatedColumns)
            }
        }

        handleDragEnd() // call this function to hide delete area
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
                {column.tasks.map((task: BoardTask, index) => (
                    <BoardTaskCard
                        handleDragStart={handleDragStart}
                        handleDragEnd={handleDragEnd}
                        column={column}
                        key={task.id}
                        task={task}
                        isLastCard={index === column.tasks.length - 1}
                    />
                ))}
                {column.tasks.length === 0 && (
                    <DropIndicator beforeId="-1" columnId={column.id} />
                )}
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

interface Indicator {
    offset: number
    element: HTMLElement
}

const highlightIndicatior = (
    e: React.DragEvent<HTMLDivElement>,
    column: BoardColumnType
) => {
    const indicators = getIndicators(column)
    clearHighlights(column)
    const el = getNearestIndicators(e, indicators)

    if (el) {
        el.element.style.opacity = '1'
    }
}

const clearHighlights = (column: BoardColumnType) => {
    const indicators = getIndicators(column)

    indicators.forEach((i: HTMLElement) => {
        i.style.opacity = '0'
    })
}

const getNearestIndicators = (
    e: React.DragEvent<HTMLDivElement>,
    indicators: HTMLElement[]
): Indicator => {
    const DISTANCE_OFFSET = 80

    const el = indicators.reduce<Indicator>(
        (closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = e.clientY - box.top - DISTANCE_OFFSET

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest
            }
        },
        {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1],
        }
    )

    return el
}

const getIndicators = (column: BoardColumnType): HTMLElement[] => {
    return Array.from(document.querySelectorAll(`[data-column="${column.id}"]`))
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
