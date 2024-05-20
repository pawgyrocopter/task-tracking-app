import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { Project } from './types'

const ProjectCard = ({ id, name }: Project) => {
    const classname = twMerge(
        `flex flex-col justify-center items-center w-[8rem] h-[6rem] bg-yellow-100 p-2`
    )

    return (
        <>
            <Link to={`/projects/${id}`} className={classname}>
                <h1 className="">{name}</h1>
            </Link>
        </>
    )
}

export default ProjectCard
