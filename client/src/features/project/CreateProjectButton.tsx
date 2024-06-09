import AddButton from '@/components/AddButton'
import { useNavigate } from 'react-router-dom'

const CreateProjectButton = () => {
    const navigate = useNavigate()

    return (
        <button
            onClick={() => navigate('/create-project')}
            className="flex w-full min-w-[14rem] items-center gap-2 rounded-xl bg-white px-2 py-2 font-bold shadow-lg md:w-auto"
        >
            <AddButton />
            <h1>Create new project</h1>
        </button>
    )
}

export default CreateProjectButton
