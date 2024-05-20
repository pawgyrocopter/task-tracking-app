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
            className="w-full bg-white p-4 rounded-lg shadow-lg"
        >
            {isMobile ? (
                <div className="w-full grid grid-cols-2 gap-4 items-center">
                    <div className="flex items-center">
                        <img
                            src="project-icon.png"
                            width={40}
                            alt="Project Icon"
                        />
                        <h1 className="ml-4">{name}</h1>
                    </div>
                    <div className="flex justify-end items-center">
                        <div className="flex justify-center font-bold mr-4">
                            <p>{completed_tasks}</p>/<p>{tasks}</p>
                        </div>
                        <ProgressCircle
                            progress={(completed_tasks / tasks) * 100}
                        />
                    </div>
                </div>
            ) : (
                <div className="w-full grid grid-cols-8 gap-4 items-center">
                    <div className="col-span-2 flex items-center">
                        <img
                            src="project-icon.png"
                            width={40}
                            alt="Project Icon"
                        />
                        <h1 className="ml-4 text-lg">{name}</h1>
                    </div>
                    <div className="col-span-5">
                        <p className="truncate text-center px-2">
                            {description}
                        </p>
                    </div>
                    <div className="col-span-1 flex justify-end items-center">
                        <div className="flex gap-2 items-center">
                            <div className="flex font-bold justify-center items-center">
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
