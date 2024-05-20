import { SubmitHandler, useForm } from 'react-hook-form'
import { CreateProjectFormFields } from './types'
import { useNavigate } from 'react-router-dom'
import AddButton from '@/components/AddButton'
import { formatDate } from '@/utils/strings'

const CreateProjectForm = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<CreateProjectFormFields>()

    const onSubmit: SubmitHandler<CreateProjectFormFields> = async (data) => {
        // simulate request
        console.log('data', data)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            navigate('/projects')
        } catch (error) {
            setError('root', {
                message: 'Some error',
            })
        }
    }

    return (
        <div className="w-full bg-gray-300 p-4 rounded-lg h-full flex flex-col justify-center items-center gap-4">
            <h1 className="text-2xl">/Create new project/</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full bg-gray-300 h-full flex flex-col items-center gap-4"
            >
                <div className="flex flex-col gap-4 justify-center items-center">
                    <div className="md:w-[32rem] w-[18rem]">
                        <input
                            {...register('name', {
                                required: 'Project name is required',
                            })}
                            type="text"
                            placeholder="Project Name"
                            className="border px-2 placeholder:text-gray-700 text-lg w-full h-[2.25rem] rounded-lg shadow-lg"
                        />
                        <p className="text-red-500 text-xs">
                            {errors.name?.message}
                        </p>
                    </div>
                    <div className="md:w-[32rem] w-[18rem]">
                        <textarea
                            {...register('description')}
                            placeholder="Description"
                            className="border px-2 placeholder:text-gray-700 text-lg w-full h-[6rem] resize-none rounded-lg shadow-lg"
                        />
                        <p className="text-red-500 text-xs">
                            {errors.description?.message}
                        </p>
                    </div>
                    <div className="w-[18rem] md:w-[32rem] flex justify-between">
                        <div className="flex flex-col">
                            <input
                                {...register('startDate', {
                                    required: 'Start date is required',
                                })}
                                placeholder="Start date"
                                type="text"
                                onFocus={(e) => (e.target.type = 'date')}
                                onBlur={(e) => {
                                    e.target.type = 'text'
                                    const formattedDate = formatDate(
                                        new Date(e.target.value)
                                    )
                                    e.target.value = formattedDate
                                }}
                                className="border px-2 placeholder:text-gray-700 text-lg w-[8.5rem] md:w-[15.5rem] h-[2.25rem] rounded-lg shadow-lg"
                            />
                            <p className="text-red-500 text-xs">
                                {errors.startDate?.message}
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <input
                                {...register('endDate', {
                                    required: 'End date is required',
                                })}
                                placeholder="End date"
                                type="text"
                                onFocus={(e) => (e.target.type = 'date')}
                                onBlur={(e) => {
                                    e.target.type = 'text'
                                    const formattedDate = formatDate(
                                        new Date(e.target.value)
                                    )
                                    e.target.value = formattedDate
                                }}
                                className="border px-2 placeholder:text-gray-700 text-lg w-[8.5rem] md:w-[15.5rem] h-[2.25rem] rounded-lg shadow-lg"
                            />
                            <p className="text-red-500 text-xs">
                                {errors.endDate?.message}
                            </p>
                        </div>
                    </div>
                    <div className="border flex gap-1 px-2 w-full h-[6rem] rounded-lg shadow-lg">
                        <p className="text-gray-700 text-lg">Collaborators</p>
                        <AddButton className="py-1 w-5 h-5" />
                    </div>
                </div>
                <button
                    disabled={isSubmitting}
                    className="mt-[1rem] text-xl text-black bg-white shadow-lg rounded-lg hover:bg-gray-300 duration-300 w-[10rem] h-[3rem] disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Loading...' : 'Submit'}
                </button>
                <p className="text-red-500 text-xs h-4">
                    {errors.root?.message}
                </p>
            </form>
        </div>
    )
}

export default CreateProjectForm
