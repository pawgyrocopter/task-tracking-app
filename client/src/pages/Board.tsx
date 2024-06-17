import {
    ProjectBoardProvider,
    useProjectBoard,
} from '@/context/ProjectBoardContext'
import BoardColumn from '@/features/project/board/BoardColumn'
import DeleteTaskArea from '@/features/project/board/DeleteTaskArea'
import { getBoardData } from '@/services/project/ProjectService'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        // make fetch and set columns with filtered tasks
        async function fetchBoardColumns() {
            if (!projectId) {
                return
            }
            setIsLoading(true)
            const columns = await getBoardData(projectId)
            setColumns(columns)
            setIsLoading(false)
        }
        fetchBoardColumns()
    }, [projectId, setColumns])

    return (
        <>
            {isLoading ? (
                'Loading...'
            ) : (
                <div className="relative flex h-full w-full flex-col">
                    <div className="flex flex-grow flex-col gap-4 overflow-y-scroll md:flex-row">
                        {columns?.map((column, idx) => (
                            <BoardColumn key={idx} column={column} />
                        ))}
                    </div>
                    <DeleteTaskArea />
                </div>
            )}
        </>
    )
}

export default BoardPage
