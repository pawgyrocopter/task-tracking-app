import { useParams } from 'react-router-dom'

const BoardPage = () => {
    const { projectId } = useParams()
    return <>{projectId} board page</>
}

export default BoardPage
