import { SubmitHandler, useForm } from 'react-hook-form'
import { CreateProjectFormFields } from './types'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CollaboratorInput from '@/components/CollaboratorInput'
import { formatDate } from '@/utils/strings'

const CreateProjectForm = () => {
    const navigate = useNavigate()
    const [collaborators, setCollaborators] = useState<string[]>([])

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<CreateProjectFormFields>()

    const onSubmit: SubmitHandler<CreateProjectFormFields> = async (data) => {
        // simulate request
        console.log('data', data)
        console.log(collaborators)

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
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex h-full w-full flex-col items-center gap-4 bg-gray-300"
            >
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-[18rem] md:w-[32rem]">
                        <input
                            {...register('name', {
                                required: 'Project name is required',
                            })}
                            type="text"
                            placeholder="Project Name"
                            className="h-[2.25rem] w-full rounded-lg border px-2 text-lg shadow-lg placeholder:text-gray-700"
                        />
                        <p className="text-xs text-red-500">
                            {errors.name?.message}
                        </p>
                    </div>
                    <div className="w-[18rem] md:w-[32rem]">
                        <textarea
                            {...register('description')}
                            placeholder="Description"
                            className="h-[6rem] w-full resize-none rounded-lg border px-2 text-lg shadow-lg placeholder:text-gray-700"
                        />
                        <p className="text-xs text-red-500">
                            {errors.description?.message}
                        </p>
                    </div>
                    <div className="flex w-[18rem] justify-between md:w-[32rem]">
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
                                className="h-[2.25rem] w-[8.5rem] rounded-lg border px-2 text-lg shadow-lg placeholder:text-gray-700 md:w-[15.5rem]"
                            />
                            <p className="text-xs text-red-500">
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
                                className="h-[2.25rem] w-[8.5rem] rounded-lg border px-2 text-lg shadow-lg placeholder:text-gray-700 md:w-[15.5rem]"
                            />
                            <p className="text-xs text-red-500">
                                {errors.endDate?.message}
                            </p>
                        </div>
                    </div>
                    <div className="w-[18rem] md:w-[32rem]">
                        <CollaboratorInput
                            collaborators={collaborators}
                            setCollaborators={setCollaborators}
                        />
                    </div>
                </div>
                <button
                    disabled={isSubmitting}
                    className="mt-[1rem] h-[3rem] w-[10rem] rounded-lg bg-white text-xl text-black shadow-lg duration-300 hover:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Loading...' : 'Submit'}
                </button>
                <p className="h-4 text-xs text-red-500">
                    {errors.root?.message}
                </p>
            </form>
        </>
    )
}

export default CreateProjectForm
