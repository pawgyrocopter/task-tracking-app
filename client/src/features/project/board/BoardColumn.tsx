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
        highlightIndicatior(e, column)
        setIsActive(true)
    }

    const handleDragLeave = () => {
        setIsActive(false)
        clearHighlights(column)
    }

    const handleDragDrop = () => {
        setIsActive(false)
        clearHighlights(column)
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
                        column={column}
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

interface Indicator {
    offset: number
    element: Element
}

const highlightIndicatior = (
    e: React.DragEvent<HTMLDivElement>,
    column: BoardColumnType
) => {
    const indicators = getIndicators(column)
    clearHighlights(column)
    const el = getNearestIndicators(e, indicators)

    if (el) {
        ;(el.element as HTMLElement).style.opacity = '1'
    }
}

const clearHighlights = (column: BoardColumnType) => {
    const indicators = getIndicators(column)

    indicators.forEach((i: Element) => {
        ;(i as HTMLElement).style.opacity = '0'
    })
}

const getNearestIndicators = (
    e: React.DragEvent<HTMLDivElement>,
    indicators: Element[]
): Indicator | null => {
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

const getIndicators = (column: BoardColumnType): Element[] => {
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
