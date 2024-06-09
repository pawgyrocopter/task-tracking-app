import { SubmitHandler, useForm } from 'react-hook-form'
import { CreateTaskFormFields } from './types'
import { useState } from 'react'
import CollaboratorInput from '@/components/CollaboratorInput'
import { formatDate, capitalizeString } from '@/utils/strings'
import { TaskPriorities } from '../project/board/types'

const CreateTaskForm = ({ onFormSubmit }: { onFormSubmit: () => void }) => {
    const [collaborators, setCollaborators] = useState<string[]>([])

    const assignee = collaborators[0]

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<CreateTaskFormFields>()

    const onSubmit: SubmitHandler<CreateTaskFormFields> = async (data) => {
        // simulate request
        console.log('data', data)
        console.log('assignee', assignee)

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // perform some action when form gets submitted. close modal, redirect, etc.
            onFormSubmit()
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
                className="flex h-full w-full flex-col items-center justify-around gap-4"
            >
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-[18rem] md:w-[32rem]">
                        <input
                            {...register('name', {
                                required: 'Task name is required',
                            })}
                            type="text"
                            placeholder="Task Name"
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
                    <div className="w-[18rem] md:w-[32rem]">
                        <select
                            {...register('priority')}
                            className="h-[2rem] w-full cursor-pointer rounded-lg border border-r-8 border-transparent text-lg shadow-lg placeholder:text-gray-700"
                        >
                            {TaskPriorities.map((priority) => (
                                <option selected={priority === 'LOWEST'}>
                                    {capitalizeString(priority)}
                                </option>
                            ))}
                        </select>
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
                            placeholder="Assignee"
                            singleCollaborator={true}
                        />
                    </div>
                </div>
                <div>
                    <button
                        disabled={isSubmitting}
                        className="mt-[1rem] h-[3rem] w-[10rem] rounded-lg bg-white text-xl text-black shadow-lg duration-300 hover:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Loading...' : 'Create'}
                    </button>
                    <p className="h-4 text-xs text-red-500">
                        {errors.root?.message}
                    </p>
                </div>
            </form>
        </>
    )
}

export default CreateTaskForm
