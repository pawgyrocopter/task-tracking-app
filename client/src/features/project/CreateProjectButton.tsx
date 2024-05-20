import { useNavigate } from 'react-router-dom'

const CreateProjectButton = () => {
    const navigate = useNavigate()

    return (
        <button
            onClick={() => navigate('/create-project')}
            className="rounded-xl w-full md:w-auto flex items-center gap-2 font-bold shadow-lg min-w-[14rem] px-2 py-2 bg-white"
        >
            <img
                className="w-9 h-9"
                src="add-circle.svg"
                alt="Add circle icon"
            />
            <h1>Create new project</h1>
        </button>
    )
}

export default CreateProjectButton
