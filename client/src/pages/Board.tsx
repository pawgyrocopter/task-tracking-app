import {
    ProjectBoardProvider,
    useProjectBoard,
} from '@/context/ProjectBoardContext'
import BoardColumn from '@/features/project/board/BoardColumn'
import DeleteTaskArea from '@/features/project/board/DeleteTaskArea'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BoardColumn as BoardColumnType } from '@/features/project/board/types'

const mockColumns: BoardColumnType[] = [
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
                avatar: '/account-avatar.svg',
                assignee: 'dima12345@gmail.com',
            },
            {
                id: '2',
                name: 'To do 2',
                description:
                    'On hold. Before saving a new tournament we should...',
                priority: 'LOW',
                avatar: '/account-avatar.svg',
                assignee: 'dima12345@gmail.com',
            },
            {
                id: '3',
                name: 'To do 3',
                description:
                    'On hold. Before saving a new tournament we should...',
                priority: 'HIGHEST',
                avatar: '/account-avatar.svg',
                assignee: 'dima12345@gmail.com',
            },
        ],
    },
    {
        id: 1,
        name: 'In Progress',
        tasks: [
            {
                id: '4',
                name: 'In Progress 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                priority: 'MEDIUM',
                avatar: '/account-avatar.svg',
                assignee: 'dima12345@gmail.com',
            },
            {
                id: '5',
                name: 'In Progress 2',
                description:
                    'On hold. Before saving a new tournament we should...',
                priority: 'HIGH',
                avatar: '/account-avatar.svg',
                assignee: 'dima12345@gmail.com',
            },
            {
                id: '6',
                name: 'In Progress 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                priority: 'LOWEST',
                avatar: '/account-avatar.svg',
                assignee: 'dima12345@gmail.com',
            },
        ],
    },
    {
        id: 2,
        name: 'Done',
        tasks: [
            {
                id: '7',
                name: 'Done 1',
                description:
                    'On hold. Before saving a new tournament we should...',
                priority: 'LOWEST',
                avatar: '/account-avatar.svg',
                assignee: 'dima12345@gmail.com',
                dueDate: new Date(2024, 10, 21),
            },
        ],
    },
]

const BoardPage = () => {
    return (
        <ProjectBoardProvider>
            <BoardContent />
        </ProjectBoardProvider>
    )
}

const BoardContent = () => {
    const { projectId } = useParams()
    const { columns, setColumns } = useProjectBoard()

    useEffect(() => {
        // make fetch and set columns with filtered tasks
        console.log(projectId)
        setColumns(mockColumns)
    }, [projectId, setColumns])

    return (
        <div className="relative flex h-full w-full flex-col">
            <div className="flex flex-grow flex-col gap-4 overflow-y-scroll md:flex-row">
                {columns?.map((column, idx) => (
                    <BoardColumn key={idx} column={column} />
                ))}
            </div>
            <DeleteTaskArea />
        </div>
    )
}

export default BoardPage
