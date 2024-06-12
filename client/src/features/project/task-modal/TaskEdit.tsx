import React from 'react'
import { BoardTask, TaskPriorities } from '../board/types'
import { capitalizeString } from '@/utils/strings'

interface TaskEditProps {
    task: BoardTask
    onChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void
    onSave: () => void
    onCancel: () => void
}

const TaskEdit: React.FC<TaskEditProps> = ({
    task,
    onChange,
    onSave,
    onCancel,
}) => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-between p-4">
            <div className="flex w-full flex-col items-center justify-center gap-4">
                <input
                    type="text"
                    name="name"
                    onChange={onChange}
                    className="text-center text-xl font-semibold"
                    defaultValue={task.name}
                />
                <textarea
                    name="description"
                    onChange={onChange}
                    className="min-h-[22rem] w-[75%] resize-none text-center md:min-h-[25rem]"
                    defaultValue={task.description}
                />
            </div>
            <div className="flex flex-col gap-10">
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2">
                        <p className="w-[5rem]">Priority:</p>
                        <select
                            name="priority"
                            onChange={onChange}
                            className="w-[6rem] rounded-md border border-gray-300"
                        >
                            {TaskPriorities.map((priority) => (
                                <option selected={priority === task.priority}>
                                    {capitalizeString(priority)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="w-[5rem]">Assignee:</p>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                name="assignee"
                                onChange={onChange}
                                className="w-[15rem]"
                                defaultValue={task.assignee}
                            />
                            <img
                                src={task.avatar}
                                className="flex h-6 w-6 items-center justify-center rounded-full"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex w-full justify-center gap-2">
                    <button
                        className="rounded-md bg-blue-500 px-4 py-1 text-white"
                        onClick={onSave}
                    >
                        Save
                    </button>
                    <button
                        className="rounded-md bg-gray-500 px-4 py-1 text-white"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskEdit
