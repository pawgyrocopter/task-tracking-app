import BoardColumn from '@/features/project/board/BoardColumn'
import { BoardColumn as BoardColumnType } from '@/features/project/board/types'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const columns: BoardColumnType[] = [
    {
        id: 0,
        name: 'To Do',
        tasks: [
            {
                id: '1',
                name: 'To do 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                priority: 'LOWEST',
                avatar: '🟥',
            },
            {
                id: '2',
                name: 'To do 2',
                description:
                    'On hold. Before saving a new tournament we should...',
                priority: 'LOW',
                avatar: '🟣',
            },
            {
                id: '3',
                name: 'To do 3',
                description:
                    'On hold. Before saving a new tournament we should...',
                priority: 'HIGHEST',
                avatar: '⚪️',
            },
        ],
    },
    {
        id: 1,
        name: 'In Progress',
        tasks: [
            {
                id: '1',
                name: 'In Progress 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                priority: 'MEDIUM',
                avatar: '🟣',
            },
            {
                id: '2',
                name: 'In Progress 2',
                description:
                    'On hold. Before saving a new tournament we should...',
                priority: 'HIGH',
                avatar: '⚫️',
            },
            {
                id: '3',
                name: 'In Progress 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                priority: 'LOWEST',
                avatar: '🟣',
            },
        ],
    },
    {
        id: 2,
        name: 'Done',
        tasks: [
            {
                id: '1',
                name: 'Done 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                priority: 'LOWEST',
                avatar: '🟢',
            },
        ],
    },
]

const BoardPage = () => {
    const { projectId } = useParams()

    useEffect(() => {
        console.log(projectId)

        // fetch tasks
    }, [])

    return (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 overflow-y-auto h-full">
            {columns.map((column, idx) => (
                <BoardColumn key={idx} column={column} />
            ))}
        </div>
    )
}

export default BoardPage
