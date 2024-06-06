import BoardColumn from '@/features/project/board/BoardColumn'
import { useParams } from 'react-router-dom'

const columns = [
    {
        id: 1,
        title: 'To Do',
        tasks: [
            {
                id: 1,
                title: 'To do 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-green-400',
                avatar: '🟥',
            },
            {
                id: 2,
                title: 'To do 2',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-yellow-400',
                avatar: '🟣',
            },
            {
                id: 3,
                title: 'To do 3',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-red-400',
                avatar: ['⚪️'],
            },
        ],
    },
    {
        id: 2,
        title: 'In Progress',
        tasks: [
            {
                id: 1,
                title: 'In Progress 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-green-400',
                avatar: '🟣',
            },
            {
                id: 2,
                title: 'In Progress 2',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-yellow-400',
                avatar: '⚫️',
            },
            {
                id: 1,
                title: 'In Progress 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-green-400',
                avatar: '🟣',
            },
            {
                id: 2,
                title: 'In Progress 2',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-yellow-400',
                avatar: '⚫️',
            },
            {
                id: 1,
                title: 'In Progress 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-green-400',
                avatar: '🟣',
            },
            {
                id: 2,
                title: 'In Progress 2',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-yellow-400',
                avatar: '⚫️',
            },
            {
                id: 1,
                title: 'In Progress 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-green-400',
                avatar: '🟣',
            },
            {
                id: 2,
                title: 'In Progress 2',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-yellow-400',
                avatar: '⚫️',
            },
            {
                id: 1,
                title: 'In Progress 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-green-400',
                avatar: '🟣',
            },
            {
                id: 2,
                title: 'In Progress 2',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-yellow-400',
                avatar: '⚫️',
            },
            {
                id: 1,
                title: 'In Progress 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-green-400',
                avatar: '🟣',
            },
            {
                id: 2,
                title: 'In Progress 2',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-yellow-400',
                avatar: '⚫️',
            },
            {
                id: 1,
                title: 'In Progress 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-green-400',
                avatar: '🟣',
            },
            {
                id: 2,
                title: 'In Progress 2',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-yellow-400',
                avatar: '⚫️',
            },
            {
                id: 1,
                title: 'In Progress 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-green-400',
                avatar: '🟣',
            },
            {
                id: 2,
                title: 'In Progress 2',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-yellow-400',
                avatar: '⚫️',
            },
            {
                id: 1,
                title: 'In Progress 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-green-400',
                avatar: '🟣',
            },
            {
                id: 2,
                title: 'In Progress 2',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-yellow-400',
                avatar: '⚫️',
            },
            {
                id: 1,
                title: 'In Progress 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-green-400',
                avatar: '🟣',
            },
            {
                id: 2,
                title: 'In Progress 2',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-yellow-400',
                avatar: '⚫️',
            },
        ],
    },
    {
        id: 3,
        title: 'Done',
        tasks: [
            {
                id: 1,
                title: 'Done 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                color: 'bg-red-400',
                avatar: '🟢',
            },
        ],
    },
]

const BoardPage = () => {
    const { projectId } = useParams()
    return (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 overflow-y-auto h-full">
            {columns.map((column) => (
                <BoardColumn column={column} />
            ))}
        </div>
    )
}

export default BoardPage
