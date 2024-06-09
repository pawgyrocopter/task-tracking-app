import { useNavigate } from 'react-router-dom'
import { Project } from './types'
import ProgressCircle from './ProgressCircle'
import useIsMobile from '@/hooks/useIsMobile'

const ProjectCard = ({
    id,
    name,
    description,
    tasks,
    completed_tasks,
}: Project) => {
    const navigate = useNavigate()
    const isMobile = useIsMobile()

    return (
        <button
            onClick={() => {
                navigate(`/projects/${id}`)
            }}
            className="w-full rounded-lg bg-white p-4 shadow-lg"
        >
            {isMobile ? (
                <div className="grid w-full grid-cols-2 items-center gap-4">
                    <div className="flex items-center">
                        <img
                            src="project-icon.png"
                            width={40}
                            alt="Project Icon"
                        />
                        <h1 className="ml-4">{name}</h1>
                    </div>
                    <div className="flex items-center justify-end">
                        <div className="mr-4 flex justify-center font-bold">
                            <p>{completed_tasks}</p>/<p>{tasks}</p>
                        </div>
                        <ProgressCircle
                            progress={(completed_tasks / tasks) * 100}
                        />
                    </div>
                </div>
            ) : (
                <div className="grid w-full grid-cols-8 items-center gap-4">
                    <div className="col-span-2 flex items-center">
                        <img
                            src="project-icon.png"
                            width={40}
                            alt="Project Icon"
                        />
                        <h1 className="ml-4 text-lg">{name}</h1>
                    </div>
                    <div className="col-span-5">
                        <p className="truncate px-2 text-center">
                            {description}
                        </p>
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center font-bold">
                                <p>{completed_tasks}</p>/<p>{tasks}</p>
                            </div>
                            <ProgressCircle
                                progress={(completed_tasks / tasks) * 100}
                            />
                        </div>
                    </div>
                </div>
            )}
        </button>
    )
}

export default ProjectCard
