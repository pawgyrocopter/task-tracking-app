import { useParams } from 'react-router-dom'

const ProjectOverview = () => {
    const { projectId } = useParams()
    return <>{projectId} project overview page</>
}

export default ProjectOverview
